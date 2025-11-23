import VerifyEmailClient from '@/components/main/auth/VerifyEmailClient';
import type { Tlocale } from '@/types/locale';

type Props = {
  params: {
    locale: Tlocale;
    code: string;
  };
};

export default async function Page({
  params,
}: Props): Promise<React.JSX.Element> {
  const { locale, code } = await params;

  return <VerifyEmailClient code={code} locale={locale} />;
}
