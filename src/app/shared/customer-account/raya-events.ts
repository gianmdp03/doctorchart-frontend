export interface RayaStatusEvent {
  externalReference: string;
  status: 'pending' | 'verifying' | 'credited' | 'expired' | 'rejected' | 'review' | 'refunded';
  preparing: boolean;
  expiresAt: string;
}

const statuses = new Set(['pending', 'verifying', 'credited', 'expired', 'rejected', 'review', 'refunded']);

export async function readRayaEvents(
  url: string,
  authorization: string,
  reference: string,
  signal: AbortSignal,
  onConnected: () => void,
  onStatus: (event: RayaStatusEvent) => Promise<void>,
): Promise<number> {
  const response = await fetch(url, {
    headers: { Authorization: authorization, Accept: 'text/event-stream' },
    cache: 'no-store',
    credentials: 'omit',
    redirect: 'error',
    signal: AbortSignal.any([signal, AbortSignal.timeout(35_000)]),
  });
  if (!response.ok || !response.body || !response.headers.get('content-type')?.startsWith('text/event-stream')) {
    await response.body?.cancel();
    if ([401, 403, 404].includes(response.status)) return -1;
    const seconds = Number(response.headers.get('retry-after'));
    return response.status === 429 ? Math.max(15, Math.min(300, seconds || 15)) * 1000 : 5000;
  }

  const decoder = new TextDecoder();
  const reader = response.body.getReader();
  let buffered = '';
  onConnected();
  try {
    while (!signal.aborted) {
      const { value, done } = await reader.read();
      if (done) return 350;
      buffered += decoder.decode(value, { stream: true });
      const frames = buffered.split('\n\n');
      buffered = frames.pop() ?? '';
      if (buffered.length > 4096) throw new Error('Invalid payment event');
      for (const frame of frames) {
        if (signal.aborted) return -1;
        if (frame.startsWith(':')) continue;
        if (!frame.startsWith('data: ') || frame.length > 4096) throw new Error('Invalid payment event');
        const data: unknown = JSON.parse(frame.slice(6));
        if (!data || typeof data !== 'object') throw new Error('Invalid payment event');
        const event = data as RayaStatusEvent;
        if (event.externalReference !== reference || !statuses.has(event.status) ||
            typeof event.preparing !== 'boolean' || typeof event.expiresAt !== 'string') {
          throw new Error('Invalid payment event');
        }
        await onStatus(event);
      }
    }
    return -1;
  } finally {
    // Cancellation also closes a partially consumed stream upon route removal.
    await reader.cancel().catch(() => undefined);
    reader.releaseLock();
  }
}
