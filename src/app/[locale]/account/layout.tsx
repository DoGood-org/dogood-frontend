import { BottomNavigation, SidebarNavigation } from '@/components';

interface AccountLayoutProps {
  children: React.ReactNode;
}

export default function AccountLayout({
  children,
}: AccountLayoutProps): React.ReactElement {
  return (
    <div className="flex min-h-screen">
      <SidebarNavigation />
      <div className="flex flex-col flex-1">
        <main className="flex-grow p-4">{children}</main>
        <BottomNavigation />
      </div>
    </div>
  );
}
