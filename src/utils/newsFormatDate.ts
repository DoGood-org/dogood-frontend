export const newsFormatDate = (date: string | Date | undefined): string => {
  if (!date) {
    return '';
  }
  try {
    const d = new Date(date);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    });
  } catch (error) {
    console.error('Помилка форматування дати:', error);
    return '';
  }
};
