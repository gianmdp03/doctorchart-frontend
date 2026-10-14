// Restore before first paint, including the splash screen. Storage may be blocked.
try {
  document.documentElement.classList.toggle('dark', localStorage.getItem('doctorchart_theme') === 'dark');
} catch { /* The default light theme remains available. */ }
