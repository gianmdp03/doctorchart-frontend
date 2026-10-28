import { afterEach, describe, expect, it, vi } from 'vitest';
import { createAuthFetch } from './auth-fetch';

describe('Auth transport deadline', () => {
  afterEach(() => vi.unstubAllGlobals());

  it('aborts a transport that never answers and lets its promise settle', async () => {
    let signal!: AbortSignal;
    const transport = vi.fn((_input, init: RequestInit) => {
      signal = init.signal!;
      return new Promise<Response>((_, reject) => {
        signal.addEventListener('abort', () => reject(signal.reason), { once: true });
      });
    });
    vi.stubGlobal('fetch', transport);
    const request = createAuthFetch(10)('https://auth.example.test/auth/v1/token').catch(error => error);
    await vi.waitFor(() => expect(signal.aborted).toBe(true));
    expect(await request).toHaveProperty('name', 'TimeoutError');
    expect(transport).toHaveBeenCalledOnce();
  });

  it('preserves cancellation supplied in request init', async () => {
    const controller = new AbortController();
    const transport = vi.fn().mockResolvedValue(new Response('{}'));
    vi.stubGlobal('fetch', transport);
    await createAuthFetch()('https://auth.example.test/auth/v1/user', { signal: controller.signal });
    const combined = transport.mock.calls[0][1].signal as AbortSignal;
    controller.abort('caller cancelled');
    expect(combined.aborted).toBe(true);
    expect(combined.reason).toBe('caller cancelled');
  });

  it('preserves a Request signal and keeps the deadline active after headers arrive', async () => {
    const controller = new AbortController();
    const transport = vi.fn().mockResolvedValue(new Response('{}'));
    vi.stubGlobal('fetch', transport);
    await createAuthFetch(10)(new Request('https://auth.example.test/auth/v1/user', { signal: controller.signal }));
    const combined = transport.mock.calls[0][1].signal as AbortSignal;
    await vi.waitFor(() => expect(combined.aborted).toBe(true));
    expect(combined.reason.name).toBe('TimeoutError');

    await createAuthFetch()(new Request('https://auth.example.test/auth/v1/user', { signal: controller.signal }));
    const requestSignal = transport.mock.calls[1][1].signal as AbortSignal;
    controller.abort('request cancelled');
    expect(requestSignal.aborted).toBe(true);
    expect(requestSignal.reason).toBe('request cancelled');
  });
});
