import { FilterValues, IReviewsItem } from '@/types/reviewType';

export const applyFilters = (
  reviews: IReviewsItem[],
  tab: string,
  query: string,
  currentFilters: FilterValues
): IReviewsItem[] => {
  return reviews.filter((review) => {
    const matchesTab =
      review.targetType?.toLowerCase() === tab.toLowerCase() || tab === '';
    if (!matchesTab) return false;

    if (query.trim()) {
      const matchesSearch = review.id
        .toLowerCase()
        .includes(query.toLowerCase().trim());
      if (!matchesSearch) return false;
    }

    if (currentFilters.status?.toUpperCase() === review.status.toUpperCase()) {
      return false;
    }

    if (
      currentFilters.rating &&
      String(review.rating) !== currentFilters.rating
    ) {
      return false;
    }

    if (currentFilters.date) {
      const reviewDate = new Date(review.createdAt).toLocaleDateString(
        'en-GB',
        { day: 'numeric', month: 'long' }
      );
      if (reviewDate !== currentFilters.date) return false;
    }

    return true;
  });
};
