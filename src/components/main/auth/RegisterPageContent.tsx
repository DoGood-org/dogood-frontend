'use client';
import React, { useEffect, useState } from 'react';
import { AuthChoice } from './AuthChoice';
import { AuthForm } from './AuthForm';
import { FormRegisterCompany, FormRegisterPerson } from '@/types/authType';
import { authStore, useAuthFlow } from '@/zustand/stores/authStore';
import { VerifyViaEmail } from '@/components/main/auth/VerififyViaEmail';

export const RegisterPageContent = (): React.ReactElement => {
  const { step, setStep } = useAuthFlow();

  const { register, registerCompany, status, isEmailVerified } = authStore();

  const [choice, setChoice] = useState<'human' | 'company' | null>(null);

  const [formPersonData, setPersonFormData] = useState<FormRegisterPerson>({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
  });
  const [formCompanyData, setCompanyFormData] = useState<FormRegisterCompany>({
    name: '',
    email: '',
    password: '',
    repeatPassword: '',
    companyName: '',
  });
  useEffect(() => {
    if (status === 'authenticated') setStep('verification');
    if (status === 'apiError') setStep('mistakeApi');
  }, [status, setStep]);

  return (
    <div className=" flex flex-col items-center justify-center  text-foreground w-full">
      {!choice && <AuthChoice onChoice={setChoice} />}
      {choice === 'human' && !step && (
        <AuthForm
          type="registerPerson"
          onFormSubmit={async (type, data) => {
            setPersonFormData({
              name: (data as FormRegisterPerson).name,
              email: (data as FormRegisterPerson).email,
              password: '',
              repeatPassword: '',
            });
            await register(
              (data as FormRegisterPerson).name,
              (data as FormRegisterPerson).email,
              (data as FormRegisterPerson).password
            );
          }}
        />
      )}
      {choice === 'company' && !step && (
        <AuthForm
          type="registerCompany"
          onFormSubmit={async (type, data) => {
            setCompanyFormData({
              name: (data as FormRegisterCompany).name,
              email: (data as FormRegisterCompany).email,
              password: '',
              repeatPassword: '',
              companyName: (data as FormRegisterCompany).companyName,
            });
            await registerCompany(
              (data as FormRegisterCompany).name,
              (data as FormRegisterCompany).email,
              (data as FormRegisterCompany).password,
              (data as FormRegisterCompany).companyName
            );
          }}
        />
      )}
      {step === 'verification' && choice && (
        <VerifyViaEmail
          onResend={() => setStep('resendLink')}
          onWrongEmail={() => setStep('mistakeInEmail')}
          email={
            choice === 'human' ? formPersonData.email : formCompanyData.email
          }
        />
      )}
      {step === 'mistakeInEmail' && choice === 'human' && (
        <AuthForm
          defaultValues={formPersonData}
          type="registerPerson"
          onFormSubmit={(type, data) => {
            console.log('Register person:', type, data);
            setStep('verification');
          }}
        />
      )}
      {step === 'mistakeInEmail' && choice === 'company' && (
        <AuthForm
          defaultValues={formCompanyData}
          type="registerCompany"
          onFormSubmit={(type, data) => {
            console.log('Register company:', type, data);
            setStep('verification');
          }}
        />
      )}
      {step === 'resendLink' && (
        <>
          <p>We will send it in 13 sec. Maybe timer here? </p>

          <VerifyViaEmail
            onResend={() => setStep('resendLink')}
            onWrongEmail={() => setStep('mistakeInEmail')}
            email={
              choice === 'human' ? formPersonData.email : formCompanyData.email
            }
          />
        </>
      )}

      {step === 'proceedToLogin' && isEmailVerified && (
        <div>
          <p>Registration successful!</p>
          <p>Redirecting to login...</p>
        </div>
      )}
    </div>
  );
};
