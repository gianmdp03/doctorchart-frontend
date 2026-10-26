# Local Google Sans

Source: owner-provided Google Fonts download (Google_Sans, 26 October 2026).
License: OFL.txt, copied from that download.

The normal and italic WOFF2 files are identical across Bycode, Pointly and DoctorChart.
They retain the variable weight (400–700), optical size and grade axes.
FontTools subsetting preserves Latin, Spanish accents, combining marks, punctuation,
currency symbols, letterlike symbols, arrows and mathematical operators.
The full multi-script TTFs are not shipped to the browser.

Both faces are preloaded. font-ready.js waits for them before revealing the body,
so a slow first load never displays a temporary font. If loading fails, content
is revealed using the browser's generic fallback instead of staying hidden.
Without JavaScript the body is never hidden. No Google Fonts service is contacted.

Global CSS inlining is disabled in the production build to apply complete styles
before the initial render. Keep these settings when changing build optimization.
