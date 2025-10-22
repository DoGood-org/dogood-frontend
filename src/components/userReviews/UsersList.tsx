'use client';
import React, { useState } from 'react';
import mocks from './mock.json';
import { Section } from '../ui/Section';
import { Close, SetPlus } from '../icons';
import { ReviewsForm } from './ReviewsForm';

export const UsersList = (): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Section>
      <div>
        <h1>Users</h1>
        <ul className="flex flex-col gap-4 mt-4">
          {mocks.map((user) => (
            <li
              key={user.id}
              className="flex gap-2 hover:text-card pointer-events-auto"
              onClick={() => setIsOpen(!isOpen)}
            >
              {user.name}
              <SetPlus className="hover:stroke-card" />
            </li>
          ))}
        </ul>
      </div>
      {isOpen && (
        <div className="fixed inset-0 w-screen h-screen z-[9991] flex items-center justify-center bg-text-help/90 overflow-y-auto py-40">
          <div className="my-container bg-background pt-10 pb-10 relative mx-auto rounded-xl">
            <ReviewsForm />
            <button
              className="absolute top-6 right-1 md:top-11 md:right-4 p-1"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Close className="stroke-foreground w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </Section>
  );
};
