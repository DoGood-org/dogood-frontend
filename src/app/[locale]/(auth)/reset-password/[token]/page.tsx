import ResetPasswordClient from '@/components/main/auth/ResetPasswordPage';
import type { Tlocale } from '@/types/locale';

type Props = {
  params: {
    locale: Tlocale;
    token: string;
  };
};

export default async function Page({
  params,
}: Props): Promise<React.JSX.Element> {
  const { locale, token } = await params;

  return <ResetPasswordClient token={token} locale={locale} />;
}
