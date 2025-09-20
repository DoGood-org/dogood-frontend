'use client';
import React, { useState } from 'react';
import { AuthChoice } from './AuthChoice';
import { AuthForm } from './AuthForm';
import { Verification } from './Verification';
import { FormRegisterCompany, FormRegisterPerson } from '@/types/authType';
import { useRouter } from 'next/navigation';
import { authStore, useAuthFlow } from '@/zustand/stores/authStore';
import { VerifyViaEmail } from '@/components/main/auth/VerififyViaEmail';

export const RegisterPageContent = (): React.ReactElement => {
  const router = useRouter();
  const { step, setStep } = useAuthFlow();

  const { register, status, error, registerCompany } = authStore();

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

  return (
    <div className=" flex flex-col items-center justify-center  text-foreground w-full">
      {!choice && <AuthChoice onChoice={setChoice} />}
      {choice === 'human' && !step && (
        <AuthForm
          type="registerPerson"
          onFormSubmit={(type, data) => {
            setStep('verification');
            setPersonFormData({
              name: (data as FormRegisterPerson).name,
              email: (data as FormRegisterPerson).email,
              password: '',
              repeatPassword: '',
            });
            register(
              (data as FormRegisterPerson).email,
              (data as FormRegisterPerson).password,
              (data as FormRegisterPerson).name
            );
            console.log('Register person, verification-->', type, data);
          }}
        />
      )}
      {choice === 'company' && !step && (
        <AuthForm
          type="registerCompany"
          onFormSubmit={(type, data) => {
            console.log('Register company, verification-->', type, data);

            setCompanyFormData({
              name: (data as FormRegisterCompany).name,
              email: (data as FormRegisterCompany).email,
              password: '',
              repeatPassword: '',
              companyName: (data as FormRegisterCompany).companyName,
            });
            registerCompany(
              (data as FormRegisterCompany).name,
              (data as FormRegisterCompany).email,
              (data as FormRegisterCompany).password,
              (data as FormRegisterCompany).companyName
            );
            setStep('verification');
          }}
        />
      )}
      {step === 'verification' && choice && (
        <VerifyViaEmail
          onResend={() => setStep('resend')}
          onWrongEmail={() => setStep('mistake')}
          onConfirm={(code) => {
            console.log('Verification code submitted:', code);
            setStep('success');
            router.push('/login');
          }}
          email={
            choice === 'human' ? formPersonData.email : formCompanyData.email
          }
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
