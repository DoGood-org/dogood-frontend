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
    <div className={`block h-4 mt-2 mb-1 mx-4  ${className}`}>
      <p className="text-[10px] text-[#FF6262]">{errorMessage}</p>
    </div>
  );
};
