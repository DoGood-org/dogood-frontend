import React from 'react';
import { Button } from '@/components/ui/Button';
import IcOutlineFacebook from '@/components/icons/IcOutlineFacebook';
import { Google } from '@/components/icons/Google';
import LinkedIn from '@/components/icons/LinkedIn';
const socialButtons = [
  {
    icon: Google,
    url: 'https://google.com',
    label: 'Google',
  },
  {
    icon: IcOutlineFacebook,
    url: 'https://facebook.com',
    label: 'Facebook',
  },
  {
    icon: LinkedIn,
    url: 'https://linkedin.com',
    label: 'LinkedIn',
  },
];
export const RegisterLoginSocial: React.FC = () => {
  return (
    <div className="flex flex-col items-center mt-4">
      <div className="flex gap-4">
        {socialButtons.map((button, index) => (
          <Button
            key={index}
            className={`btn-${button.label.toLowerCase()}`}
            variant="outline"
            aria-label={button.label}
            title={button.label}
            onClick={() => window.open(button.url, '_blank')}
          >
            <button.icon className="" />
          </Button>
        ))}
      </div>
    </div>
  );
};
