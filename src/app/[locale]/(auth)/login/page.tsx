import { AuthForm } from '@/components';
import React from 'react';

const LoginPage: React.FC = () => {
  return (
    <section className="bg-[#171b19] flex flex-col items-center justify-center  text-white w-full min-h-screen">
      <AuthForm type="login" />
    </section>
  );
};

export default LoginPage;
