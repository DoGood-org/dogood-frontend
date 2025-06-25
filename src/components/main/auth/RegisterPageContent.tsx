'use client';
import React, { useState } from 'react';
import { AuthChoice } from './AuthChoice';
import { AuthForm } from './AuthForm';
import { Verification } from './Verification';

export const RegisterPageContent = (): React.ReactElement => {
  const [choice, setChoice] = useState<'human' | 'company' | null>(null);
  const [step, setStep] = useState<null | 'verification'>(null);

  return (
    <div className=" flex flex-col items-center justify-center  text-foreground w-full">
      {!choice && <AuthChoice onChoice={setChoice} />}
      {choice === 'human' && !step && (
        <AuthForm
          type="registerPerson"
          onFormSubmit={(type, data) => {
            setStep('verification');
            console.log('Register person:', type, data);
          }}
        />
      )}
      {choice === 'company' && !step && (
        <AuthForm
          type="registerCompany"
          onFormSubmit={(type, data) => {
            console.log('Register company:', type, data);
            setStep('verification');
          }}
        />
      )}

      {step === 'verification' && choice && <Verification />}
      {/* {choice && step!=='verification' && (
        <div className="block mt-4 text-center">
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
      )} */}
    </div>
  );
};
