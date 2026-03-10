const fallbackFormattedDate = "Date unavailable";

export function isValidDate(value: string) {
  const date = new Date(value);
  return !Number.isNaN(date.getTime());
}

export function formatDate(input: string, fallback = fallbackFormattedDate) {
  const parsedDate = new Date(input);

  if (Number.isNaN(parsedDate.getTime())) {
    return fallback;
  }

  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(parsedDate);
}
