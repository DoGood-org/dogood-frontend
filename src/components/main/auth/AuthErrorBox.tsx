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
    <div className={`block h-[16px] mt-[2px] mx-4  ${className}`}>
      <p className="text-[10px] text-[#FF6262]">{errorMessage}</p>
    </div>
  );
};
