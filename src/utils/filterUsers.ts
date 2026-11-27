import { startOfDay, endOfDay, isWithinInterval } from 'date-fns';
import { FilterValues, IUser } from '@/types/admin';

const normalize = (s: string): string =>
  s
    .toUpperCase()
    .replace(/[\s_-]+/g, ' ')
    .trim();

export const applyUsersFilters = (
  users: IUser[],
  currentFilters: FilterValues,
  searchQuery: string = ''
): IUser[] => {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return users.filter((user) => {
    if (currentFilters.status) {
      const selected = normalize(currentFilters.status);
      if (selected !== normalize(user.status)) return false;
    }

    if (currentFilters.role) {
      const selected = normalize(currentFilters.role);
      if (selected !== normalize(user.role)) return false;
    }

    if (currentFilters.date) {
      const userDate = new Date(user.createdAt);
      const day = startOfDay(currentFilters.date);

      if (!isWithinInterval(userDate, { start: day, end: endOfDay(day) })) {
        return false;
      }
    }

    if (normalizedQuery) {
      const matchesName = user.name?.toLowerCase().includes(normalizedQuery);
      const matchesEmail = user.email?.toLowerCase().includes(normalizedQuery);
      const matchesId = String(user.id).toLowerCase().includes(normalizedQuery);

      if (!matchesName && !matchesEmail && !matchesId) return false;
    }

    return true;
  });
};
