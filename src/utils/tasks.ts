export const parseRequirements = (requirements?: string): string[] => {
  if (!requirements) return [];
  return requirements
    .replace(/^Requirements:\s*/i, '')
    .split(/(\.\s+|\n|(?=[A-Z][a-z]))/g)
    .map((r) => r.trim())
    .filter((r) => r.length > 0 && r !== '.' && r !== ' ');
};

export const parseDescription = (
  description: string
): (string | string[])[] => {
  return description
    .split('\n')
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return null;
      if (trimmed.startsWith('- ') || trimmed.startsWith('• ')) {
        return trimmed
          .split(/(?:- |• )/)
          .filter(Boolean)
          .map((i) => i.trim());
      }
      return trimmed;
    })
    .filter(Boolean) as (string | string[])[];
};

export const getDonationPercentage = (
  collected: number | null | undefined,
  goal: number | null | undefined
): number => {
  if (!goal || goal <= 0) return 0;

  return Math.min(Math.round(((collected ?? 0) / goal) * 100), 100);
};

export const formatMoney = (value: number, currency = 'USD'): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);
