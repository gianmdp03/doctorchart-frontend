// Computed checks supplement keyboard exercises; this is not a WCAG certification.
module.exports = async function checkAccessibility(page) {
  return page.evaluate(() => {
    const canvas = document.createElement('canvas'); canvas.width = canvas.height = 1;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    const color = value => { context.clearRect(0, 0, 1, 1); context.fillStyle = value; context.fillRect(0, 0, 1, 1); return [...context.getImageData(0, 0, 1, 1).data]; };
    const blend = (a, b) => { const alpha = a[3] / 255; return [0, 1, 2].map(i => a[i] * alpha + b[i] * (1 - alpha)).concat(255); };
    const luminance = c => c.slice(0, 3).map(v => v / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4).reduce((n, v, i) => n + v * [.2126, .7152, .0722][i], 0);
    const background = element => { const ancestors = []; for (let e = element; e; e = e.parentElement) ancestors.unshift(e); return ancestors.reduce((bg, e) => blend(color(getComputedStyle(e).backgroundColor), bg), [255, 255, 255, 255]); };
    const visible = e => { const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && getComputedStyle(e).visibility !== 'hidden'; };
    const disabled = e => e.closest(':disabled, [aria-disabled="true"], fieldset:disabled');
    const selector = e => e.tagName.toLowerCase() + (e.id ? '#' + e.id : '.' + String(e.className).trim().replace(/\s+/g, '.').slice(0, 90));
    const contrast = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let node;
    while ((node = walker.nextNode())) {
      const element = node.parentElement;
      if (!node.textContent.trim() || !element || !visible(element) || disabled(element) || element.closest('script, style, svg, ng-icon, option, .sr-only, [aria-hidden="true"]')) continue;
      const style = getComputedStyle(element);
      // Opacity and image backgrounds need pixel sampling and are reported by the visual review.
      if (Number(style.opacity) < 1 || style.backgroundImage !== 'none') continue;
      const bg = background(element), fg = blend(color(style.color), bg), a = luminance(bg), b = luminance(fg);
      const ratio = (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
      const large = parseFloat(style.fontSize) >= 24 || parseFloat(style.fontSize) >= 18.66 && Number(style.fontWeight) >= 700;
      if (ratio < (large ? 3 : 4.5) - .02) contrast.push({ selector: selector(element), text: node.textContent.trim().slice(0, 70), ratio: Number(ratio.toFixed(2)), required: large ? 3 : 4.5, foreground: style.color, background: bg });
    }
    const unnamed = [...document.querySelectorAll('button, input:not([type="hidden"]), select, textarea')].filter(e => {
      if (!visible(e) || disabled(e)) return false;
      return !(e.getAttribute('aria-label') || e.getAttribute('aria-labelledby') || e.getAttribute('title') || e.labels?.length || (e.tagName === 'BUTTON' && e.textContent.trim()));
    }).map(selector);
    return { contrast, unnamedControls: unnamed };
  });
};
