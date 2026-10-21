// src/app/core/date/display-date.ts
function displayLocalDate(value) {
  const match = value?.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return match ? match[3] + "/" + match[2] + "/" + match[1] : "\u2014";
}

export {
  displayLocalDate
};
//# debugId=97db573f-a870-5371-9256-fcb24e0bf8bf
//# sourceMappingURL=chunk-6MPLKXQY.js.map
