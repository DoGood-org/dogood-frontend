export const formatDate = (dateString: string, locale: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = new Intl.DateTimeFormat(locale, { month: 'long' }).format(date);
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};
