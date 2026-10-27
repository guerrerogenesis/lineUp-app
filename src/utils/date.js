const timeFormat = new Intl.DateTimeFormat("es-MX", { hour: "2-digit", minute: "2-digit", hour12: false });
const shortDate = new Intl.DateTimeFormat("es-MX", { day: "numeric", month: "short" });
const longDate = new Intl.DateTimeFormat("es-MX", { weekday: "long", day: "numeric", month: "short" });

const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);

const isSameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();

/** "Viernes, 23 oct" */
export function formatToday(date = new Date()) {
  return capitalize(longDate.format(date).replace(".", ""));
}

/** "Hoy · 10:24", "Ayer · 17:05" o "12 oct · 09:00" */
export function formatCreatedAt(timestamp) {
  if (!timestamp) return null;
  const date = new Date(timestamp);
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(now.getDate() - 1);

  let day = shortDate.format(date).replace(".", "");
  if (isSameDay(date, now)) day = "Hoy";
  else if (isSameDay(date, yesterday)) day = "Ayer";

  return `${day} · ${timeFormat.format(date)}`;
}
