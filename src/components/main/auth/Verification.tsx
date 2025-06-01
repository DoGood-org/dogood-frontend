'use client';
import { Button } from '@/components/ui/Button';

import React, { useEffect, useRef } from 'react';

export const Verification: React.FC = () => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const [focusedIndex, setFocusedIndex] = React.useState<number | null>(0);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const value = e.target.value;

    if (/^\d$/.test(value)) {
      if (index < inputsRef.current.length - 1) {
        inputsRef.current[index + 1]?.focus();
        setFocusedIndex(index + 1);
      }
    } else {
      e.target.value = '';
    }
  };
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ): void => {
    if (e.key === 'Backspace' && index > 0 && e.currentTarget.value === '') {
      inputsRef.current[index - 1]?.focus();
      setFocusedIndex(index - 1);
    }
    if (e.key === 'ArrowLeft' && index > 0) {
      inputsRef.current[index - 1]?.focus();
      setFocusedIndex(index - 1);
    }
    if (e.key === 'ArrowRight' && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
      setFocusedIndex(index + 1);
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      // Handle form submission or next action here
      console.log(
        'Code submitted:',
        inputsRef.current.map((input) => input?.value).join('')
      );
    }
    if (e.key === 'Escape') {
      e.preventDefault();
      // Clear the input fields
      inputsRef.current.forEach((input) => {
        if (input) input.value = '';
      });
      inputsRef.current[0]?.focus();
      setFocusedIndex(0);
    }
  };

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
              ref={(el) => {
                inputsRef.current[i] = el;
              }}
              onChange={(e) => handleChange(e, i)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              key={i}
              maxLength={1}
              type="text"
              className={`w-10 text-center border-b-2 border-white focus:outline-none text-xl bg-transparent text-white placeholder:text-white ${i === 0 ? 'ml-0' : ''} ${
                focusedIndex === i
                  ? 'focus:border-green-500'
                  : 'focus:border-white'
              }`}
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
