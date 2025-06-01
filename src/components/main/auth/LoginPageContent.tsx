'use client';
import { AuthForm } from '@/components';
import React from 'react';

export const LoginPageContent: React.FC = () => {
  return (
    <div className="bg-[#171b19] flex flex-col items-center justify-center  text-white w-full min-h-screen">
      <AuthForm
        type="login"
        onFormSubmit={(type, data) => {
          console.log('Login person:', type, data);
        }}
      />
    </div>
  );
};
