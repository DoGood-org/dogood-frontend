import { BottomNavigation, PageContent, SidebarNavigation } from '@/components';

export default function AuthLayout(): React.ReactNode {
  return (
    <>
      <div className="flex min-h-screen px-20 pt-20">
        <SidebarNavigation />
        <div className="flex flex-col flex-grow">
          <PageContent />
        </div>
      </div>
      <BottomNavigation />
    </>
  );
}
