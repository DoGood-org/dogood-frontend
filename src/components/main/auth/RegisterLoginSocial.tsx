import React from 'react';
import { Google } from '@/components/icons/Google';
import LinkedIn from '@/components/icons/LinkedIn';
import { Facebook } from '@/components/icons/FaceBook';
import SvgRiTwitterXLine from '@/components/icons/RiTwitterXLine';

const socialButtons = [
  {
    icon: Google,
    url: 'https://google.com',
    label: 'Google',
  },
  {
    icon: Facebook,
    url: 'https://facebook.com',
    label: 'Facebook',
  },
  {
    icon: LinkedIn,
    url: 'https://linkedin.com',
    label: 'LinkedIn',
  },
  {
    icon: SvgRiTwitterXLine,
    url: 'https://x.com',
    label: 'X',
  },
];
type Props = {
  onSocialLogin?: (provider: string) => void;
  className?: string;
};
export const RegisterLoginSocial: React.FC<Props> = ({
  onSocialLogin,
  className,
}) => {
  return (
    <div className={`flex flex-col mt-6 items-center ${className}`}>
      <div className="flex gap-6">
        {socialButtons.map((button, index) => (
          <button
            key={index}
            aria-label={button.label}
            title={button.label}
            onClick={() => onSocialLogin && onSocialLogin(button.label)}
          >
            <button.icon className="w-8 h-8 text-white" />
          </button>
        ))}
      </div>
    </div>
  );
};
