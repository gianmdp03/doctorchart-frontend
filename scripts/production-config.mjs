import { isIP } from 'node:net';
export function validateProduction(site) {
  for (const [name, value] of Object.entries({ publicSiteUrl: site.publicSiteUrl, apiGatewayOrigin: site.apiGatewayOrigin, ...site.applicationUrls })) {
    let url;
    try { url = new URL(value); } catch { throw new Error(name + ': falta una URL HTTPS pública; configurala en site.config.json.'); }
    if ((isIP(url.hostname) !== 0 || url.hostname.startsWith('[') || !url.hostname.includes('.')) || url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash || url.username || url.password || /^(localhost|127\.|0\.|\[?::1\]?$)/i.test(url.hostname) || /\.(local|invalid|test)$|trycloudflare\.com$/i.test(url.hostname)) throw new Error(name + ': se requiere un origen HTTPS público definitivo.');
  }
  return site;
}
