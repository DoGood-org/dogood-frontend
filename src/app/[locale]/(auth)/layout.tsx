import { Section } from '@/components';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <>
      <Section
        withContainer={true}
        className="  
        auth
        flex
        flex-col
        items-center
        justify-center
 
        pt-[80px]
        lg:pt-[76px]

    w-full
    h-dvh
    "
      >
        {children}
      </Section>
    </>
  );
}
