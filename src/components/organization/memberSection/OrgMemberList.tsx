import { filterMemberByRole } from '@/lib/filterMemberByRole';
import { UserOrganization } from '@/types';
import { JSX } from 'react';

export const OrgMemberList = ({
  members,
}: {
  members: UserOrganization[];
}): JSX.Element => {
  const orgRoles = ['ADMIN', 'MODERATOR', 'MEMBER'];
  return (
    <>
      {orgRoles.map((role) => (
        <>
          <h2 className="capitalize">{role.toLowerCase()}</h2>
          <ul>
            {filterMemberByRole(members, role).map((member, id) => (
              <li key={`${member.userId}-${id}`}>
                <p>{member.userId}</p>
              </li>
            ))}
          </ul>
        </>
      ))}
    </>
  );
};
