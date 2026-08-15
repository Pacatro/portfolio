const dateFormatters = {
  short: new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }),
  long: new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }),
};

type DateStyle = keyof typeof dateFormatters;

export function formatDate(date: Date, style: DateStyle = "short"): string {
  return dateFormatters[style].format(date);
}
