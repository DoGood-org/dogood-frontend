import { ChatSearch } from '@/components/icons';
import { UserOrganization } from '@/types';
import Image from 'next/image';
import { JSX, useState } from 'react';

export const AddModeratorModal = ({
  members,
}: {
  members: UserOrganization[];
}): JSX.Element => {
  const [query, setQuery] = useState('');
  const filteredUsers = members.filter((member) => member.role === 'MEMBER');
  return (
    <div>
      <div className="border-b border-solid border-white w-full py-3 px-2 mb-6 flex gap-2">
        <ChatSearch className="size-6 stroke-current rotate-90" />
        <input
          name="userName"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search user by name"
          className=" w-full outline-none"
        />
      </div>
      {/* 
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error</p>}

      {!isLoading && filteredUsers.length === 0 && debouncedQuery && (
        <p>No users found</p>
      )} */}

      <ul className="flex flex-col gap-2 max-h-[296px]">
        {filteredUsers.map(({ user }) => (
          <li key={user.id} className="bg-[#252525] p-2 rounded-lg">
            {/* <button onClick={() => addMemberOnClick(user)}>Add</button> */}
            <button
              // disabled={addMemberMutation.isPending}
              // onClick={() => handleAdd(user)}
              className="flex gap-4 items-center cursor-pointer"
            >
              <Image
                src={user?.profile?.avatar || '/account/avatar.png'}
                width={60}
                height={60}
                alt={user.name}
                className="object-cover rounded-[10px]"
              />
              {user.name}
              {/* {addMemberMutation.isPending ? 'Adding...' : 'Add'} */}
            </button>
            {/* {addMemberMutation.isError && <p>Error adding member</p>} */}
          </li>
        ))}
      </ul>
    </div>
  );
};
