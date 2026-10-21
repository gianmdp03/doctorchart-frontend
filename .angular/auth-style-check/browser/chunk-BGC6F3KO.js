// src/app/core/models/api-response.model.ts
function getTotalElements(res) {
  if (!res) return 0;
  if (typeof res.totalElements === "number") return res.totalElements;
  if (typeof res.page?.totalElements === "number") return res.page.totalElements;
  if (Array.isArray(res.content)) return res.content.length;
  return 0;
}
function getTotalPages(res) {
  if (!res) return 1;
  if (typeof res.totalPages === "number") return res.totalPages;
  if (typeof res.page?.totalPages === "number") return res.page.totalPages;
  return 1;
}

export {
  getTotalElements,
  getTotalPages
};
//# debugId=abf85884-9750-5a20-904a-927c4985bb10
//# sourceMappingURL=chunk-BGC6F3KO.js.map
