'use client';

import { useState, useMemo, JSX } from 'react';
import { useQuery } from '@tanstack/react-query';
// import { searchUsersByName, UserShort } from '@/api/users';
import { UserShort } from '@/types';
import { searchUsersByName } from '@/services/publicUserService';
// import { addMemberToOrganization } from '@/services/organizationService';
import { useAddMemberToOrganization } from '@/hooks/useAddMemberToOrganization';
import { useDebounce } from '@/hooks/useDebounce';
import Image from 'next/image';
// import { addUserToOrganization } from '@/api/organizations';

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

  // console.log('Members ', existingMemberIds);

  // ⬇️ ФІЛЬТРУЄМО ВЖЕ ДОДАНИХ
  const filteredUsers = useMemo(
    () => users.filter((user) => !existingMemberIds.includes(user.id)),
    [users, existingMemberIds]
  );

  // const filteredUsers = useMemo(() => users, [users]);

  // console.log(filteredUsers);

  // const filteredUsers = useMemo(
  //   () =>
  //     debouncedQuery.length >= 2
  //       ? users.filter((user) => !existingMemberIds.includes(user.id))
  //       : [],
  //   [users, existingMemberIds, debouncedQuery]
  // );

  // const addMemberOnClick = async (user: UserShort): Promise<void> => {
  //   const data = {
  //     userId: user.id,
  //     organizationId,
  //     role: 'MEMBER',
  //     status: 'PENDING',
  //   };

  //   await addMemberToOrganization(data);
  // };

  const addMemberMutation = useAddMemberToOrganization(
    organizationId,
    debouncedQuery
  );

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
      <input
        name="userName"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search user by name"
        className="border-b border-solid border-white w-full outline-none py-3 px-2 mb-6"
      />

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}

      {!isLoading && filteredUsers.length === 0 && debouncedQuery && (
        <p>No users found</p>
      )}

      <ul className="flex flex-col gap-2">
        {filteredUsers.map((user) => (
          <li key={user.id} className="bg-[#252525] p-2 rounded-lg">
            {/* <button onClick={() => addMemberOnClick(user)}>Add</button> */}
            <button
              disabled={addMemberMutation.isPending}
              onClick={() => handleAdd(user)}
              className="flex gap-4 items-center cursor-pointer"
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
