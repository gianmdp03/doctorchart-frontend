import { describe, expect, it, vi } from 'vitest';
import type { CustomerAccountContext } from '../../shared/customer-account/account-context';
import { downloadPracticeExport } from './practice-export-download';

const owner = 'doctor-a';
const url = 'https://example.test/api/doctorchart/exports/export-1/file';
const binary = new Uint8Array([0x50, 0x4b, 0x03, 0x04]);

function setup(body = binary) {
  const chunks: number[] = [];
  const close = vi.fn();
  const abort = vi.fn();
  const stream = new WritableStream<Uint8Array>({
    write(chunk) { chunks.push(...chunk); },
    close,
    abort,
  });
  const fetch = vi.fn().mockResolvedValue(new Response(body, { headers: { 'Content-Type': 'application/zip' } }));
  const showSaveFilePicker = vi.fn().mockResolvedValue({ createWritable: async () => stream });
  const account = { owner: vi.fn().mockReturnValue(owner), token: async () => 'test-bearer' };
  const document = { defaultView: { fetch, showSaveFilePicker } } as unknown as Document;
  const signal = new AbortController().signal;
  return {
    fetch, showSaveFilePicker, chunks, close, abort, account,
    download: () => downloadPracticeExport(document, account as unknown as CustomerAccountContext, owner, url, binary.length, signal),
  };
}

describe('Descarga de la práctica', () => {
  it('streams the ZIP to disk using a bearer token only for the authorized export URL', async () => {
    const result = setup();
    await result.download();
    expect(result.showSaveFilePicker).toHaveBeenCalledWith({ suggestedName: 'doctorchart-export.zip' });
    expect(result.fetch).toHaveBeenCalledWith(url, expect.objectContaining({
      headers: { Authorization: 'Bearer test-bearer', Accept: 'application/zip' },
      cache: 'no-store',
      redirect: 'error',
    }));
    expect(result.chunks).toEqual([...binary]);
    expect(result.close).toHaveBeenCalledOnce();
    expect(result.abort).not.toHaveBeenCalled();
  });

  it('aborts a truncated file before committing the disk write', async () => {
    const result = setup(binary.slice(0, 2));
    await expect(result.download()).rejects.toThrow('Descarga incompleta');
    expect(result.close).not.toHaveBeenCalled();
    expect(result.abort).toHaveBeenCalledOnce();
  });

  it('does not send the current token for an export belonging to a previous account', async () => {
    const result = setup();
    result.account.owner.mockReturnValue('doctor-b');
    await expect(result.download()).rejects.toMatchObject({ status: 401 });
    expect(result.fetch).not.toHaveBeenCalled();
  });
});
