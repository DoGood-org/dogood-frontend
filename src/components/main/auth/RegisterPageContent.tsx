'use client';
import React, { useState } from 'react';
import { AuthChoice } from './AuthChoice';
import { AuthForm } from './AuthForm';
import { Verification } from './Verification';
import { FormRegisterCompany, FormRegisterPerson } from '@/types/authType';
import { useRouter } from 'next/navigation';

export const RegisterPageContent = (): React.ReactElement => {
  const router = useRouter();

  const [choice, setChoice] = useState<'human' | 'company' | null>(null);
  const [step, setStep] = useState<
    null | 'verification' | 'success' | 'mistake' | 'resend'
  >(null);
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

  return (
    <div className=" flex flex-col items-center justify-center  text-foreground w-full">
      {!choice && <AuthChoice onChoice={setChoice} />}
      {choice === 'human' && !step && (
        <AuthForm
          type="registerPerson"
          onFormSubmit={(type, data) => {
            setStep('verification');
            console.log('Register person, verification-->', type, data);
            setPersonFormData({
              name: (data as FormRegisterPerson).name,
              email: (data as FormRegisterPerson).email,
              password: '',
              repeatPassword: '',
            });
          }}
        />
      )}
      {choice === 'company' && !step && (
        <AuthForm
          type="registerCompany"
          onFormSubmit={(type, data) => {
            console.log('Register company, verification-->', type, data);
            setStep('verification');
            setCompanyFormData({
              name: (data as FormRegisterCompany).name,
              email: (data as FormRegisterCompany).email,
              password: '',
              repeatPassword: '',
              companyName: (data as FormRegisterCompany).companyName,
            });
          }}
        />
      )}
      {step === 'verification' && choice && (
        <Verification
          onResend={() => setStep('resend')}
          onWrongEmail={() => setStep('mistake')}
          onConfirm={(code) => {
            console.log('Verification code submitted:', code);
            setStep('success');
            router.push('/login');
          }}
        />
      )}
      {step === 'mistake' && choice === 'human' && (
        <AuthForm
          defaultValues={formPersonData}
          type="registerPerson"
          onFormSubmit={(type, data) => {
            console.log('Register person:', type, data);
            setStep('verification');
          }}
        />
      )}
      {step === 'mistake' && choice === 'company' && (
        <AuthForm
          defaultValues={formCompanyData}
          type="registerCompany"
          onFormSubmit={(type, data) => {
            console.log('Register company:', type, data);
            setStep('verification');
          }}
        />
      )}
      {step === 'resend' && (
        <>
          <p>We will send it in 13 sec. Maybe timer here? </p>

          <Verification
            onResend={() => setStep('resend')}
            onWrongEmail={() => setStep('mistake')}
            onConfirm={(code) => {
              console.log('Verification code submitted:', code);
              setStep('success');
              router.push('/login');
            }}
          />
        </>
      )}
      {step === 'success' && (
        <div>
          <p>Registration successful!</p>
          <p>Redirecting to login...</p>
        </div>
      )}
    </div>
  );
};
