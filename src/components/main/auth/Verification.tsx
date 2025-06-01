import { Button } from '@/components/ui/Button';

import React from 'react';

export const Verification: React.FC = () => {
  return (
    <div className="flex flex-col p-[40px] gap-[32px] w-[514px] justify-center items-center mt-4 bg-[#303030] text-white rounded  shadow-md">
      <h2 className="text-[32px] font-bold">Email Confirmation </h2>
      <p className="roboto text-sm">
        Enter the code from the email we sent to{' '}
        <span className="font-bold">DoGood@gmail.com</span>
      </p>
      <div className="flex gap-4">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <input
              key={i}
              maxLength={1}
              type="text"
              className="w-10 text-center border-b-2 border-white focus:outline-none text-xl"
            />
          ))}
      </div>
      <Button
        type="button"
        variant={'default'}
        size={'md'}
        className="btn-auth mt-1 btn-expand-hover text-white h-[44px] w-full"
      >
        Create account{' '}
      </Button>{' '}
      <a href="#" className="text-white underline">
        {' '}
        <p className="roboto font-normal">Didnt get the email? </p>{' '}
      </a>{' '}
      <a href="#" className="text-white underline">
        <p> Made a mistake in the email? </p>
      </a>
    </div>
  );
};
