import React from 'react';
import MdiLinkedin from '@/components/icons/MdiLinkedin';
import RiTwitterXLine from '@/components/icons/RiTwitterXLine';
import IcOutlineFacebook from '@/components/icons/IcOutlineFacebook';
import IcBaselineTelegram from '@/components/icons/IcBaselineTelegram';
import RiInstagramLine from '@/components/icons/RiInstagramLine';

const socialLinks = [
  { icon: MdiLinkedin, url: 'https://www.linkedin.com' },
  { icon: RiTwitterXLine, url: 'https://twitter.com' },
  { icon: IcOutlineFacebook, url: 'https://facebook.com' },
  { icon: IcBaselineTelegram, url: 'https://telegram.org' },
  { icon: RiInstagramLine, url: 'https://instagram.com' },
];

export const SocialLinks: React.FC = () => {
  return (
    <ul className="flex sm:gap-4 lg:gap-6 ">
      {socialLinks.map(({ icon: Icon, url }, index) => (
        <li key={index}>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <Icon className="sm:w-[30px] sm:h-[30px] lg:w-[32px] lg:h-[32px] text-[white] hover:text-[#999] transition duration-300" />
          </a>
        </li>
      ))}
    </ul>
  );
};
