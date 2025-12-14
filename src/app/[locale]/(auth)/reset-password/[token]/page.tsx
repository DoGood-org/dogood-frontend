import ResetPasswordClient from '@/components/main/auth/ResetPasswordPage';
import type { Tlocale } from '@/types/locale';

interface Props {
  params: Promise<{ token: string; locale: Tlocale }>;
}

export default async function Page({
  params,
}: Props): Promise<React.JSX.Element> {
  const { locale, token } = await params;
  return <ResetPasswordClient token={token} locale={locale} />;
}
