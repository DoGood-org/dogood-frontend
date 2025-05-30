import { Footer, Header } from '@/components';

export default function CatLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
