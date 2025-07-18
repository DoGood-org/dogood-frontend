import {
  AccountContent,
  BottomNavigation,
  Container,
  PageContent,
  SidebarNavigation,
} from '@/components';

export default function AuthLayout(): React.ReactNode {
  return (
    <>
      <Container>
        <div className="flex">
          <SidebarNavigation />
          <div className="flex flex-col flex-grow">
            <PageContent />
          </div>
        </div>
        <AccountContent />
        <BottomNavigation />
      </Container>
    </>
  );
}
