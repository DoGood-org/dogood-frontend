export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <>
      <div className="absolute inset-0 bg-[#171b19]"></div>
      <section className="h-[calc(100vh-188px)] pt-[104px] flex items-center justify-center ">
        {children}
      </section>
    </>
  );
}
