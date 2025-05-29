import React from 'react';
import { AuthForm } from '@/components/main/auth/AuthForm';
import { AuthChoice } from '@/components';

const RegisterPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-188px)] bg-gray-100">
      <AuthChoice />
      <AuthForm type="registerCompany" />
    </div>
  );
};

export default RegisterPage;
