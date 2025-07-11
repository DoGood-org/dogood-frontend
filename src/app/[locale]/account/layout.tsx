import { BottomNavigation, SidebarNavigation } from '@/components';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <div className="flex min-h-screen px-20 pt-20">
      <SidebarNavigation />
      <div className="flex flex-col flex-grow">
        {children}
        <BottomNavigation />
      </div>
    </div>
  );
}
