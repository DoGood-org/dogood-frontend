'use client';
import { Button } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';

import React, { useEffect, useRef } from 'react';

export const Verification: React.FC = () => {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [focusedIndex, setFocusedIndex] = React.useState<number | null>(0);
  const [inputValues, setInputValues] = React.useState<string[]>(
    Array(6).fill('')
  );

  const t = useTranslations('auth');
  const isIncomplete = inputValues.some((v) => v === '');

  // focus on mount
  useEffect(() => {
    inputsRef.current[0]?.focus();
    setFocusedIndex(0);
    buttonRef.current?.setAttribute('aria-disabled', String(isIncomplete));
  }, [isIncomplete]);

  // // update aria-disabled when values change
  // useEffect(() => {
  //   buttonRef.current?.setAttribute('aria-disabled', String(isIncomplete));
  // }, [isIncomplete]);

  console.log('isIncomplete:', isIncomplete);
  console.log('values:', inputValues);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const value = e.target.value;

    if (/^\d$/.test(value)) {
      const newValues = [...inputValues];
      newValues[index] = value;
      setInputValues(newValues);

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
    const isEmpty = e.currentTarget.value === '';
    const lastIndex = inputsRef.current.length - 1;

    switch (e.key) {
      case 'Backspace':
        if (index > 0 && isEmpty) {
          inputsRef.current[index - 1]?.focus();
          setFocusedIndex(index - 1);
        }
        break;

      case 'ArrowLeft':
        if (index > 0) {
          inputsRef.current[index - 1]?.focus();
          setFocusedIndex(index - 1);
        }
        break;

      case 'ArrowRight':
        if (index < lastIndex) {
          inputsRef.current[index + 1]?.focus();
          setFocusedIndex(index + 1);
        }
        break;
      case 'Enter':
        e.preventDefault();

        if (isIncomplete) {
          console.warn('Please fill all input fields before submitting.');

          const firstEmptyIndex = inputsRef.current.findIndex(
            (input) => !input?.value
          );

          if (firstEmptyIndex !== -1) {
            inputsRef.current[firstEmptyIndex]?.focus();
            setFocusedIndex(firstEmptyIndex);
          }

          return;
        }
        // all inputs are filled, reset the input
        console.log('Verification code submitted:', inputValues.join(''));

        setInputValues(Array(6).fill(''));
        setFocusedIndex(0);
        inputsRef.current.forEach((input) => input && (input.value = ''));
        inputsRef.current[0]?.focus();

        break;
      case 'Escape':
        e.preventDefault();
        setInputValues(Array(6).fill(''));
        inputsRef.current.forEach((input) => input && (input.value = ''));
        inputsRef.current[0]?.focus();
        setFocusedIndex(0);
        break;
      default:
        break;
    }
  };

  const handleClick = (): void => {
    if (isIncomplete) {
      console.warn('Please fill all input fields before submitting.');

      const firstEmptyIndex = inputsRef.current.findIndex(
        (input) => !input?.value
      );

      if (firstEmptyIndex !== -1) {
        inputsRef.current[firstEmptyIndex]?.focus();
        setFocusedIndex(firstEmptyIndex);
      }

      return;
    }

    // all inputs are filled, reset the input
    console.log('Verification code submitted:', inputValues.join(''));
    setInputValues(Array(6).fill(''));
    setFocusedIndex(0);
    inputsRef.current.forEach((input) => input && (input.value = ''));
    inputsRef.current[0]?.focus();
  };

  return (
    <div className="z-10 flex flex-col p-[40px] w-[514px] gap-[32px] justify-center items-center  bg-[#303030] text-[var(--text-white)] rounded  shadow-md">
      <div className="flex flex-col gap-[40px] w-full justify-center items-center">
        <h2 className="text-[32px] font-bold ">{t('verificationRequired')} </h2>
        <p className="roboto text-[16px] font-normal">
          {t('enterVerificationCode')}
          <span className="font-bold">{t('yourEmail')}</span>
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
                className={`w-10 text-center border-b-[5px] border-white focus:outline-none text-[32px] bg-transparent text-[var(--text-white)] placeholder:text-white ${i === 0 ? 'ml-0' : ''} ${
                  focusedIndex === i
                    ? 'focus:border-green-500'
                    : 'focus:border-white'
                }`}
              />
            ))}
        </div>
        <Button
          ref={buttonRef}
          onClick={handleClick}
          type="button"
          variant={'default'}
          size={'md'}
          disabled={isIncomplete}
          aria-label="Confirm Verification Code"
          className="btn-auth mt-[4px] btn-expand-hover  h-[44px] w-full text-[var(--text-white)]"
        >
          {t('confirm')}
        </Button>
      </div>

      <div className="flex flex-col items-center gap-[12px] roboto text-[16px] font-normal text-[#F1F1F1]">
        <a href="#" className="text-[var(--text-gray)] ">
          <p>{t('didntGetEmail')} </p>
        </a>
        <a href="#" className="text-[var(--text-gray)] ">
          <p>{t('madeMistakeInEmail')} </p>
        </a>
      </div>
    </div>
  );
};
