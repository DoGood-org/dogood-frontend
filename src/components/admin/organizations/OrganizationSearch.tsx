import { ChatSearch, CloseIcon } from '@/components/icons';
import { JSX } from 'react';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

export const OrganizationSearch = ({ value, onChange }: Props): JSX.Element => (
  <div className="flex w-full h-12 gap-2 pl-2 py-3 pr-3 md:pr-4 mb-6 rounded-lg bg-modal">
    <ChatSearch className="rotate-90 stroke-current size-6" />

    <input
      name="organizationName"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Search..."
      className="w-full outline-none placeholder:text-gray"
    />
    {value && (
      <button
        type="button"
        aria-label="Clear search"
        onMouseDown={(e) => e.preventDefault()}
        onClick={() => onChange('')}
        className="
          shrink-0
          text-foreground
          hover:text-btn-hover
          active:text-btn-active
          transition-colors 
          cursor-pointer
        "
      >
        <CloseIcon className="size-5" />
      </button>
    )}
  </div>
);
