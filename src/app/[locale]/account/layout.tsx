import { BottomNavigation, SidebarNavigation } from '@/components';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <div className="flex min-h-screen p-20">
      <SidebarNavigation />
      <div className="flex">
        {children}
        <BottomNavigation />
      </div>
    </div>
  );
}
