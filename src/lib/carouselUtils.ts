export type CarouselItem = string;

export const getLoopedItem = (
  items: CarouselItem[],
  index: number
): CarouselItem => {
  const totalItems = items.length;
  const normalizedIndex = ((index % totalItems) + totalItems) % totalItems;
  return items[normalizedIndex];
};

export const getVisibleItems = (
  items: CarouselItem[],
  activeIndex: number,
  count: number = 3
): CarouselItem[] => {
  const half = Math.floor(count / 2);
  return Array.from({ length: count }, (_, i) =>
    getLoopedItem(items, activeIndex - half + i)
  );
};
