export const formatDate = (dateString: string, locale: string): string => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = new Intl.DateTimeFormat(locale, { month: 'long' }).format(date);
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
};

export const formatTime = (dateString: string, locale: string): string => {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat(locale, {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  }).format(date);
};
