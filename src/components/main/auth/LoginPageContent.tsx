'use client';
import { AuthForm } from '@/components';
import React from 'react';

export const LoginPageContent: React.FC = () => {
  return (
    <div className=" login text-[var(--foreground)] flex flex-col items-center justify-center w-full">
      <AuthForm
        type="login"
        onFormSubmit={(type, data) => {
          console.log('Login person:', type, data);
        }}
      />
    </div>
  );
};
