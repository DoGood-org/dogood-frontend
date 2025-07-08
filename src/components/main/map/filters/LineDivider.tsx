import { JSX } from 'react';

type Props = {
  className?: string;
};

export const LineDivider = ({ className }: Props): JSX.Element => {
  return <div className={`${className}`} />;
};
