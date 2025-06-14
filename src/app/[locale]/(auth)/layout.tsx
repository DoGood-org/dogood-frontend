export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <>
      <section
        className=" 
        dark
        px-[4px]
        pt-[168px]
    pb-[64px]
    my-container
    w-full
    min-h-[calc(100dvh-188px)]
    text-[var(--foreground)]
  
    flex
    "
      >
        {children}
      </section>
    </>
  );
}
