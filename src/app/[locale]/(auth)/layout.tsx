export default function CatLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <>
      <section className="w-full h-[calc(100vh-188px)] pt-[104px] flex items-center justify-center bg-[#171b19]">
        {children}
      </section>
    </>
  );
}
