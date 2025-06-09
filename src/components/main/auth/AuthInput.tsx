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
  error?: string;
  className?: string;
  id?: string;
  autoFocus?: boolean;
};

export const AuthInput = forwardRef<HTMLInputElement, Props>((props, ref) => (
  <>
    <div className="flex flex-col gap-[12px] w-full">
      <label
        className="roboto block text-[18px] font-normal"
        htmlFor={props.htmlFor}
      >
        {props.label}
      </label>
      <div className="relative flex items-center">
        <Input
          ref={ref}
          onChange={props.onChange}
          id={props.id}
          className={`
            w-full px-4 py-2 text-[16px] font-normal rounded-[20px] text-[#696969] bg-white
            placeholder:text-[#696969] focus:outline-none focus:ring-2 focus:ring-[var(--border)]
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
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer"
            onClick={props.onIconClick}
          >
            {props.icon}
          </span>
        )}
      </div>
    </div>
  </>
));
AuthInput.displayName = 'AuthInput';
