import { ChatSearch } from '@/components/icons';
import { JSX } from 'react';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const OrganizationSearch = ({ value, onChange }: Props): JSX.Element => (
  <div className="flex w-full h-12 gap-2 px-2 py-3 mb-6 rounded-lg bg-modal">
    <ChatSearch className="rotate-90 stroke-current size-6" />

    <input
      name="organizationName"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search..."
      className="w-full outline-none placeholder:text-gray"
    />
  </div>
);
