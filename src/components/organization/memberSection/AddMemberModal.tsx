'use client';

import { useState, useMemo, JSX } from 'react';
import { useQuery } from '@tanstack/react-query';
import { UserShort } from '@/types';
import { searchUsersByName } from '@/services/publicUserService';
import { useAddMemberToOrganization } from '@/hooks/useAddMemberToOrganization';
import { useDebounce } from '@/hooks/useDebounce';
import Image from 'next/image';
import { ChatSearch } from '@/components/icons';

export type AddMemberModalProps = {
  organizationId: string;
  existingMemberIds: string[];
};

export const AddMemberModal = ({
  organizationId,
  existingMemberIds,
}: AddMemberModalProps): JSX.Element => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);

  const {
    data: users = [],
    isLoading,
    isError,
  } = useQuery<UserShort[]>({
    queryKey: ['user-search', debouncedQuery],
    queryFn: () => searchUsersByName(debouncedQuery),
    enabled: debouncedQuery.length >= 2,
  });

  // ⬇️ ФІЛЬТРУЄМО ВЖЕ ДОДАНИХ
  const filteredUsers = useMemo(
    () => users.filter((user) => !existingMemberIds.includes(user.id)),
    [users, existingMemberIds]
  );

  const addMemberMutation = useAddMemberToOrganization(debouncedQuery);

  const handleAdd = (user: UserShort): void => {
    addMemberMutation.mutate({
      userId: user.id,
      organizationId,
      role: 'MEMBER',
      status: 'PENDING',
    });

    console.log(addMemberMutation);
  };

  return (
    <div>
      <div className="flex w-full gap-2 px-2 py-3 mb-6 border-b border-white border-solid">
        <ChatSearch className="rotate-90 stroke-current size-6" />
        <input
          name="userName"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search user by name"
          className="w-full outline-none "
        />
      </div>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}

      {!isLoading && filteredUsers.length === 0 && debouncedQuery && (
        <p>No users found</p>
      )}

      <ul className="flex flex-col gap-2">
        {filteredUsers.map((user) => (
          <li key={user.id} className="bg-[#252525] p-2 rounded-lg">
            <button
              disabled={addMemberMutation.isPending}
              onClick={() => handleAdd(user)}
              className="flex items-center gap-4 cursor-pointer"
            >
              <Image
                src={user?.avatar || '/account/avatar.png'}
                width={60}
                height={60}
                alt={user.name}
                className="object-cover rounded-[10px]"
              />
              {user.name}
              {addMemberMutation.isPending ? 'Adding...' : 'Add'}
            </button>
            {addMemberMutation.isError && <p>Error adding member</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};
