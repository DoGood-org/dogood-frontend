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
        flex
        px-[4px]
        pt-[168px]
    pb-[64px]
    my-container
    w-full
    min-h-[calc(100dvh-188px)]
    "
      >
        {children}
      </Section>
    </>
  );
}
