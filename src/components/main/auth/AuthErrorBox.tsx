import React from 'react';

type Props = {
  errorMessage?: string;
  className?: string;
};

export const AuthErrorBox = ({
  errorMessage,
  className = '',
}: Props): React.ReactElement => {
  return (
    <div className={`block h-[34px]   ${className}`}>
      <p className="text-xs text-red-500 my-1">{errorMessage}</p>
    </div>
  );
};
