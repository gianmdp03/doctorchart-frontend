/** Bound the SDK transport as well as the UI wait, including reading the response body. */
export function createAuthFetch(milliseconds = 12000): typeof fetch {
  return (input, init) => {
    const signals = [AbortSignal.timeout(milliseconds)];
    if (input instanceof Request) signals.push(input.signal);
    if (init?.signal) signals.push(init.signal);
    return fetch(input, { ...init, signal: AbortSignal.any(signals) });
  };
}
