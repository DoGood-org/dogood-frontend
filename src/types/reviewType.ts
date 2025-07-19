import { DetailedHTMLProps, HTMLAttributes, KeyboardEvent } from 'react';
import { FieldError } from 'react-hook-form';

export interface RatingProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLUListElement>,
    HTMLUListElement
  > {
  isEditable?: boolean;
  rating: number;
  setRating?: (rating: number) => void;
  error?: FieldError;
}

export interface StarItemProps {
  index: number;
  isFilled: boolean;
  isEditable: boolean;
  error?: FieldError;
  changeDisplay: (index: number) => void;
  resetDisplay: () => void;
  onClick: (index: number) => void;
  handleKey: (e: KeyboardEvent) => void;
  computeFocus: (rating: number, index: number) => number;
}
