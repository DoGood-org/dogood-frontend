import React from 'react';

type Props = {
  errorMessage: string;
};
export const AuthErrorBox = (props: Props): React.ReactElement => {
  return (
    <div className="min-h-[20px] bg-red-500 text-white p-4 rounded-md">
      {props.errorMessage}
    </div>
  );
};
