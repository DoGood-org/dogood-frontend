import VerifyEmailClient from '@/components/main/auth/VerifyEmailClient';
import type { Tlocale } from '@/types/locale';

type Ctx = {
  params: Promise<{ locale: Tlocale; code: string }>;
};

export default async function Page({
  params,
}: Ctx): Promise<React.JSX.Element> {
  const { locale, code } = await params;

  return <VerifyEmailClient code={code} locale={locale} />;
}
