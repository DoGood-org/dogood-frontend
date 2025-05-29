'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
type Props = {
  type: 'registerCompany' | 'registerPerson' | 'login';
};
type FormRegisterCompany = {
  name: string;
  companyName: string;
  email: string;
  password: string;
  repeatPassword: string;
};
type FormRegisterPerson = {
  name: string;
  companyName: string;
  email: string;
  password: string;
  repeatPassword: string;
};
type FormLogin = {
  email: string;
  password: string;
};

export const AuthForm: React.FC<Props> = props => {
  const { type } = props;
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormRegisterCompany | FormRegisterPerson | FormLogin>({
    defaultValues: {
      email: '',
      password: '',
      name: '',
      companyName: '',
      repeatPassword: '',
    },
  });

  return (
    <div>
      <form onSubmit={e => e.preventDefault()} className="flex flex-col gap-4">
        {type === 'registerCompany' && (
          <>
            <div>
              <label htmlFor="name">Name:</label>
              <input
                id="name"
                type="text"
                {...control.register('name', { required: 'Name is required' })}
              />
            </div>
            <div>
              <label htmlFor="companyName">Company Name:</label>
              <input
                id="companyName"
                type="text"
                {...control.register('companyName', {
                  required: 'Company name is required',
                })}
              />
            </div>
          </>
        )}

        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            {...control.register('email', { required: 'Email is required' })}
          />
          {errors.email && <span>{errors.email.message}</span>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            id="password"
            type="password"
            {...control.register('password', {
              required: 'Password is required',
            })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
