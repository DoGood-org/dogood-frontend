export type ReviewTypes = {
  review: string;
  author: string;
};

export type ReviewCardProps = {
  review: ReviewTypes;
  className?: string;
  index: number;
};
