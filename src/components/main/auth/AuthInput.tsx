import { Input } from '@/components/ui/Input';

type Props = {
  label?: string;
  htmlFor?: string;
  ref?: React.Ref<HTMLInputElement>;
  placeholder?: string;
  type?: 'text' | 'email' | 'password';
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  className?: string;
  id?: string;
};
import React from 'react';

export const AuthInput: React.FC<Props> = (props) => {
  return (
    <div className="flex flex-col gap-[10px]">
      <label
        className="roboto block text-[18px] font-normal"
        htmlFor={props.htmlFor}
      >
        {props.label}
      </label>
      <Input
        ref={props.ref}
        onChange={props.onChange}
        id={props.id}
        className={`${props.className} bg-white text-[#696969] text-[16px] rounded-[20px] placeholder:text-[#696969] focus:outline-none focus:ring-0 focus:border-[var(--primary)]`}
        type={props.type}
        placeholder={props.placeholder}
        value={props.value}
      />
    </div>
  );
};
