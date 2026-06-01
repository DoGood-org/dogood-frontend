// 'use client';

// import { OrganizationDetailedProps } from '@/types';
// import { JSX } from 'react';
// import { Section } from '@/components/ui/Section';
// import { OrganizationDesc } from '@/components/organization/OrganizationDesc';
// import { OrganizationContent } from '@/components/organization/OrganizationContent';

// export const OrganizationLayout = ({
//   organization,
// }: {
//   organization: OrganizationDetailedProps;
// }): JSX.Element => {
//   return (
//     <>
//       <Section>
//         <OrganizationDesc organization={organization} />
//       </Section>
//       <OrganizationContent organization={organization} />
//     </>
//   );
// };

'use client';

import { OrganizationDetailedProps, Role } from '@/types';
// import { Section } from 'lucide-react';
import { OrganizationDesc } from './OrganizationDesc';
import { OrganizationContent } from './OrganizationContent';
import { IJoinRequests } from '@/types/joinRequest.type';
import { JSX } from 'react';
import { UserRoleProvider } from '../providers/UserRoleProvider';
import { Section } from '../ui/Section';

type OrgLayoutProps = {
  organization: OrganizationDetailedProps;
  joinRequests: IJoinRequests[];
  userRole: Role;
};

export const OrganizationLayout = ({
  organization,
  joinRequests,
  userRole,
}: OrgLayoutProps): JSX.Element => {
  return (
    <UserRoleProvider role={userRole}>
      <Section>
        <OrganizationDesc organization={organization} />
        {/* <div>TEST DESC</div> */}
      </Section>

      <OrganizationContent
        organization={organization}
        joinRequests={joinRequests}
      />
    </UserRoleProvider>
  );
};
