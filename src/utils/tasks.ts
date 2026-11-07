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

export const getDonationProgress = (current = 0, goal = 0): number =>
  goal > 0 ? Math.min(100, Math.round((current / goal) * 100)) : 0;

export const formatMoney = (value: number, currency = 'USD'): string =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value);
