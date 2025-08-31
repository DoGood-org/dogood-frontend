import { routing } from '@/i18n/routing';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import enCommon from '../../messages/en/common.json';
import enHeader from '../../messages/en/header.json';
import enFooter from '../../messages/en/footer.json';

export interface ButtonPanelProps {
  variantBtn1: 'primary' | 'secondary' | null | undefined;
  hrefBtn1?: string;
  variantBtn2: 'primary' | 'secondary' | null | undefined;
  hrefBtn2?: string;
  handleResetBtn?: () => void;
  handleContactBtn?: () => void;
  nameBtn1: string;
  nameBtn2: string;
}
export interface NotFoundProps extends ButtonPanelProps {
  scrImg: string | StaticImport;
  title: string;
  description: string;
  text: string;
  stuckText?: string;
  email?: string;
}

export type AppLocale = (typeof routing.locales)[number];

export type Messages = {
  common: typeof enCommon;
  header: typeof enHeader;
  footer: typeof enFooter;
};
