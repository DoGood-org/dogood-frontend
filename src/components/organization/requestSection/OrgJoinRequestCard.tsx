import { UserNoAvatar } from '@/components/account/accountPage/UserNoAvatar';
import { IJoinRequests } from '@/types/joinRequest.type';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import Link from 'next/link';
import { JSX } from 'react';
import { JoinRequestButtons } from './JoinRequestButtons';
import { useOrganizationPermissions } from '@/hooks/useOrganizationPermissions';
import { useUserRole } from '@/components/providers/UserRoleProvider';

type OrgJoinRequestCardProps = {
  request: IJoinRequests;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
};

export const OrgJoinRequestCard = ({
  request,
  onApprove,
  onReject,
}: OrgJoinRequestCardProps): JSX.Element => {
  const { id, name, profile } = request.sender;
  const locale = useLocale();
  const role = useUserRole();
  const { canApproveRequest } = useOrganizationPermissions(role);

  const imageStyles =
    'shrink-0 w-[100px] h-[100px] md:w-[100px] md:h-[100px] lg:h-[100px] lg:w-[100px] object-cover rounded-lg self-center md:self-start';

  return (
    <div
      key={id}
      className="flex flex-col justify-center md:flex-row md:items-center md:justify-between gap-6 p-4 rounded-lg bg-card"
    >
      <div className="flex items-center gap-6 md:gap-8">
        {profile?.avatar ? (
          <Image
            src={profile?.avatar}
            alt={name}
            width={100}
            height={100}
            className={imageStyles}
          />
        ) : (
          <UserNoAvatar className={imageStyles} />
        )}

        <Link
          href={`/${locale}/profile/${id}`}
          className="text-base font-semibold hover:text-btn-hover focus:text-btn-hover active:text-btn-active"
        >
          {name}
        </Link>
      </div>
      {canApproveRequest && (
        <JoinRequestButtons
          onApprove={() => onApprove(request.id)}
          onReject={() => onReject(request.id)}
        />
      )}
    </div>
  );
};
