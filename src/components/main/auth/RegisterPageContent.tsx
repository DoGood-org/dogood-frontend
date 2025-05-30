'use client';
import React, { useState } from 'react';
import { AuthChoice } from './AuthChoice';
import { AuthForm } from './AuthForm';

export const RegisterPageContent = (): React.ReactElement => {
  const [choice, setChoice] = useState<'human' | 'company' | null>(null);

  return (
    <section className="bg-[#171b19] flex flex-col items-center justify-center h-[calc(100vh-188px)] text-white w-full">
      {!choice && <AuthChoice onChoice={setChoice} />}
      {choice === 'human' && <AuthForm type="registerPerson" />}
      {choice === 'company' && <AuthForm type="registerCompany" />}
      {choice && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">You have selected: </p>
          <strong>{choice === 'human' ? 'Human' : 'Company'}</strong>
          <button
            className="ml-2 underline text-blue-400 hover:text-blue-300"
            onClick={() => setChoice(null)}
            type="button"
          >
            Change
          </button>
        </div>
      )}
    </section>
  );
};
