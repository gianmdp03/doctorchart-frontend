import type { CustomerAccountContext } from '../../shared/customer-account/account-context';

const ZIP_NAME = 'doctorchart-export.zip';

type SavePickerWindow = Window & {
  showSaveFilePicker?: (options: { suggestedName: string }) => Promise<FileSystemFileHandle>;
};

export class ExportDownloadError extends Error {
  constructor(readonly status: number) {
    super('Error al descargar la copia');
  }
}

async function chooseFile(window: SavePickerWindow): Promise<FileSystemFileHandle | undefined> {
  try {
    return await window.showSaveFilePicker?.({ suggestedName: ZIP_NAME });
  } catch (error) {
    if (error instanceof DOMException && ['SecurityError', 'NotSupportedError'].includes(error.name)) return undefined;
    throw error;
  }
}

export async function downloadPracticeExport(
  document: Document,
  account: CustomerAccountContext,
  owner: string,
  url: string,
  expectedBytes: number,
  signal: AbortSignal,
): Promise<void> {
  const window = document.defaultView;
  if (!window) throw new Error('Descarga no disponible');
  const handle = await chooseFile(window);
  signal.throwIfAborted();
  const token = await account.token();
  if (!token || account.owner() !== owner) throw new ExportDownloadError(401);

  const response = await window.fetch(url, {
    signal,
    headers: { Authorization: 'Bearer ' + token, Accept: 'application/zip' },
    cache: 'no-store',
    credentials: 'omit',
    redirect: 'error',
    referrerPolicy: 'no-referrer',
  });
  if (!response.ok || response.headers.get('content-type')?.split(';')[0] !== 'application/zip') {
    await response.body?.cancel();
    throw new ExportDownloadError(response.status);
  }
  if (account.owner() !== owner) {
    await response.body?.cancel();
    throw new ExportDownloadError(401);
  }

  if (handle && response.body) {
    let bytes = 0;
    const accounting = new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        bytes += chunk.byteLength;
        if (bytes > expectedBytes) throw new Error('Tamaño de copia incorrecto');
        controller.enqueue(chunk);
      },
      flush() {
        if (bytes !== expectedBytes) throw new Error('Descarga incompleta');
      },
    });
    const file = await handle.createWritable();
    await response.body.pipeThrough(accounting).pipeTo(file, { signal });
    return;
  }

  const blob = await response.blob();
  signal.throwIfAborted();
  if (account.owner() !== owner) throw new ExportDownloadError(401);
  if (blob.size !== expectedBytes) throw new Error('Descarga incompleta');
  const link = document.createElement('a');
  const blobURL = URL.createObjectURL(blob);
  link.href = blobURL;
  link.download = ZIP_NAME;
  try {
    document.body.appendChild(link);
    link.click();
  } finally {
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(blobURL), 1000);
  }
}
