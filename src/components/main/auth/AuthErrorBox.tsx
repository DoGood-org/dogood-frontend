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
      <p className="text-xs text-[#FF6262] my-1">{errorMessage}</p>
    </div>
  );
};
