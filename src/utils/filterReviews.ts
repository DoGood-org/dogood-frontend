import { FilterValues, IReviewsItem } from '@/types/admin';
import { isWithinInterval, startOfDay, endOfDay } from 'date-fns';

export const applyReviewsFilters = (
  reviews: IReviewsItem[],
  tab: string,
  currentFilters: FilterValues
): IReviewsItem[] => {
  return reviews.filter((review) => {
    const matchesTab =
      review.targetType?.toLowerCase() === tab.toLowerCase() || tab === '';
    if (!matchesTab) return false;

    if (
      currentFilters.status &&
      currentFilters.status.toUpperCase() !== review.status.toUpperCase()
    ) {
      return false;
    }

    if (
      currentFilters.rating &&
      String(review.rating) !== currentFilters.rating
    ) {
      return false;
    }

    if (currentFilters.dateRange?.from) {
      const reviewDate = new Date(review.createdAt);
      const from = startOfDay(currentFilters.dateRange.from);
      const to = currentFilters.dateRange.to
        ? endOfDay(currentFilters.dateRange.to)
        : endOfDay(currentFilters.dateRange.from);

      if (!isWithinInterval(reviewDate, { start: from, end: to })) {
        return false;
      }
    }

    return true;
  });
};
