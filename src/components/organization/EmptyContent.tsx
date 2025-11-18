import { JSX } from 'react';

export const EmptyContent = ({
  children,
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <div className="bg-card m-auto p-8 text-center rounded-lg w-full">
      <p className="text-base lg:text-h3">{children}</p>
    </div>
  );
};
