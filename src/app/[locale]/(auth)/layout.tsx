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
        pt-[110px] 
        
        lg:pt-[126px]


    w-full
    min-h-dvh
    "
      >
        {children}
      </Section>
    </>
  );
}
