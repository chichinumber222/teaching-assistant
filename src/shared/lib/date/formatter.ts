type DateInput = Date | string | number;

type CreateDateFormatterOptions = {
  locale?: string;
  options?: Intl.DateTimeFormatOptions;
  fallback?: string;
};

export function createDateFormatter({
  locale = "ru-RU",
  options,
  fallback = "—",
}: CreateDateFormatterOptions = {}) {
  const formatter = new Intl.DateTimeFormat(locale, options);

  return (value: DateInput): string => {
    const date = value instanceof Date ? value : new Date(value);

    if (Number.isNaN(date.getTime())) {
      return fallback;
    }

    return formatter.format(date);
  };
}
