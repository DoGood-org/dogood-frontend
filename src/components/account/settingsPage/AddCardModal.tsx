// app/account/page.tsx
'use client';

import { JSX, useState } from 'react';
import { CardModal, StripeProvider } from '@/components';

export const AddCardModal = (): JSX.Element => {
  const [open, setOpen] = useState(false);

  return (
    <section>
      <StripeProvider>
        <button onClick={() => setOpen(true)} className="btn-primary">
          Add Card
        </button>
        <CardModal open={open} onClose={() => setOpen(false)} />
      </StripeProvider>
    </section>
    // <div className="container">
    //   <h1 className="text-2xl mb-4">Мій акаунт</h1>

    //   <button
    //     onClick={() => setOpen(true)}
    //     className="px-4 py-2 bg-blue-600 text-white rounded"
    //   >
    //     Додати картку
    //   </button>

    //   {/* <CardModal /> */}
    //   <CardModal open={open} onClose={() => setOpen(false)} />
    // </div>
  );
};
