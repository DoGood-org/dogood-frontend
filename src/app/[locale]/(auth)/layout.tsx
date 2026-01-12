import { Section } from '@/components/ui/Section';

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
        pt-12
    
     
        
      
    w-full
    min-h-dvh  
    lg:pt-[126px]
    "
      >
        {children}
      </Section>
    </>
  );
}
