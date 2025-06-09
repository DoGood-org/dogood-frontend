export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <>
      <div className="absolute inset-0 bg-[#171b19]"></div>

      <section
        className=" pt-[104px] pb-[104px]   bg-red-500
      gap-[60px] w-full text-[var(--text-white)] z-10
      sm:h-[calc(100vh-188px)] sm:pt-[104px]"
      >
        {children}
      </section>
    </>
  );
}
