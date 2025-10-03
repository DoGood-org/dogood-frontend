type Location = {
  city?: string;
  region?: string;
  country?: string;
};

export const formatLocation = (
  location: Location | null | undefined
): string => {
  if (!location) return '';
  return [location.city, location.region, location.country]
    .filter(Boolean)
    .join(', ');
};
