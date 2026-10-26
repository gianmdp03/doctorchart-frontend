// Keep the first visible render in Google Sans, even on an empty cache or slow network.
(function () {
  if (!document.fonts) return;
  var root = document.documentElement;
  root.classList.add('fonts-loading');
  Promise.all([
    document.fonts.load('400 1em "Google Sans"'),
    document.fonts.load('italic 400 1em "Google Sans"')
  ]).then(showContent, showContent);
  // A missing font must not leave the application hidden.
  function showContent() { root.classList.remove('fonts-loading'); }
})();
