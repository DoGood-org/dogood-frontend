import { Check } from '@/components/icons/Check';
import { CircleAlertIcon } from '@/components/icons/CircleAlertIcon';
import { AuthErrorBox } from '@/components/main/auth/AuthErrorBox';
import { Input } from '@/components/ui/Input';
import React, { forwardRef } from 'react';

type Props = {
  label?: string;
  htmlFor?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  icon?: React.ReactNode;
  iconRight?: boolean;
  onIconClick?: () => void;
  setClickedIcon?: (v: boolean) => void; // ✅ to manage blur logic
  errorMessage?: string;
  className?: string;
  id?: string;
  autoFocus?: boolean;
  touched?: boolean;
};

export const AuthInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  const showValid =
    props.touched && !props.errorMessage && (props.value?.length ?? 0) > 0;
  const showError = props.touched && !!props.errorMessage;

  return (
    <>
      <div className="flex flex-col gap-[8px] w-full">
        <label className=" block text-base font-normal" htmlFor={props.htmlFor}>
          {props.label}
        </label>
        <div className="relative flex items-center">
          <Input
            ref={ref}
            onChange={props.onChange}
            id={props.id}
            className={`
            border-1
            border-text-gray
           w-full h-[48px] px-4 py-3 text-base font-normal rounded-[4px] text-[#696969] bg-white
           hover:shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]
            focus:shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]
            focus:ring-1 focus:ring-[0_4px_4px_0_rgba(0,0,0,0.25)] focus:border-transparent
           placeholder:text-[#999] focus:outline-none
           ${showError ? 'border-error ring-error' : showValid ? 'border-border ring-border' : 'border-border ring-border'}


            ${props.icon ? (props.iconRight ? 'pr-10' : 'pl-10') : ''}
            ${props.className}
          `}
            type={props.type}
            placeholder={props.placeholder}
            value={props.value}
            onBlur={props.onBlur}
            autoComplete="off"
            autoFocus={props.autoFocus}
          />
          {props.iconRight && props.icon && (
            <span
              className={`absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#696969] 
                ${showValid || showError ? 'right-10' : 'right-3'} `}
              onClick={props.onIconClick}
            >
              {props.icon ? props.icon : null}
            </span>
          )}

          {showError && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-var(--color-error)">
              <CircleAlertIcon fill="var(--color-error)" />
            </span>
          )}
          {showValid && (
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 text-
            var(--color-success)"
            >
              <Check fill="var(--color-success)" />
            </span>
          )}
        </div>
      </div>
      <AuthErrorBox
        errorMessage={props.errorMessage ? props.errorMessage : undefined}
      />
    </>
  );
});
AuthInput.displayName = 'AuthInput';
