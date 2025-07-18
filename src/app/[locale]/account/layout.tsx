import {
  BottomNavigation,
  Container,
  PageContent,
  SidebarNavigation,
} from '@/components';

export default function AuthLayout(): React.ReactNode {
  return (
    <>
      <Container>
        <div className="flex min-h-screen pt-20">
          <SidebarNavigation />
          <div className="flex flex-col flex-grow">
            <PageContent />
          </div>
        </div>
        <BottomNavigation />
      </Container>
    </>
  );
}
