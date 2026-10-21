// src/app/core/date/user-time-zone.ts
function userTimeZone() {
  try {
    return new Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
}
function instantParts(instant, timeZone = userTimeZone()) {
  const date = instant instanceof Date ? instant : new Date(instant);
  if (!Number.isFinite(date.getTime())) return { day: "", time: "" };
  const parts = new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(date);
  const part = (key) => parts.find((p) => p.type === key)?.value ?? "";
  return { day: `${part("year")}-${part("month")}-${part("day")}`, time: `${part("hour")}:${part("minute")}` };
}
function formatInstant(instant, withTime = true, timeZone = userTimeZone()) {
  const { day, time } = instantParts(instant, timeZone);
  if (!day) return "\u2014";
  const [year, month, date] = day.split("-");
  return `${date}/${month}/${year}${withTime ? " " + time : ""}`;
}
function todayDate(timeZone = userTimeZone()) {
  return instantParts(/* @__PURE__ */ new Date(), timeZone).day;
}
function shiftCalendarDate(day, days) {
  const date = /* @__PURE__ */ new Date(day + "T12:00:00Z");
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

export {
  userTimeZone,
  instantParts,
  formatInstant,
  todayDate,
  shiftCalendarDate
};
//# debugId=1ca676f8-2bf0-5380-82f4-ad67d9423b87
//# sourceMappingURL=chunk-YTAXUAO7.js.map
