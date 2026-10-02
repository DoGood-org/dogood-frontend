import { useMemo } from 'react';
import { ChatType } from '@/types/chatType';

export function useFilteredChats<T extends ChatType>(
  chats: T[],
  searchQuery: string
): T[] {
  return useMemo(() => {
    const query = searchQuery.toLowerCase();

    return chats.filter((chat) => chat.name.toLowerCase().includes(query));
  }, [chats, searchQuery]);
}
