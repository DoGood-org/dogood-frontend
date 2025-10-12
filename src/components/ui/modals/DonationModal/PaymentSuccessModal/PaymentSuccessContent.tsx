'use client';

// import Image from 'next/image';
import { JSX } from 'react';

export const PaymentSuccessContent = (): JSX.Element => {
  return (
    <section className="flex flex-col items-center justify-center p-6">
      <div
        className="relative w-72 h-72 mx-auto mb-6 
          rounded-full overflow-hidden  
          flex items-center justify-center"
      >
        {/* <Image
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          src={Abstract}
          alt="Abstract circular lines decoration"
        /> */}

        {/* 3. Текст "Thank you!" */}
        <span className="absolute text-3xl font-bold text-white z-10 drop-shadow-sm">
          Thank you!
        </span>
      </div>
    </section>
  );
};
