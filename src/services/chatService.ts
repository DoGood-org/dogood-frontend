import { fetchFromApi, FetchResult } from '@/lib/api/apiFetcher';
import { ChatType, MessageType } from '@/types/chatType';

export const createChatRoom = async (
  participantsIds: string[]
): Promise<FetchResult<{ room: ChatType }>> => {
  return fetchFromApi<{ room: ChatType }>('/chat/new', {
    method: 'POST',
    auth: true,
    data: { participantsIds },
  });
};

export const getChatRooms = async (): Promise<
  FetchResult<{
    rooms: ChatType[];
  }>
> => {
  return fetchFromApi<{ rooms: ChatType[] }>('/chat/rooms', {
    method: 'GET',
    auth: true,
  });
};

export const getMessagesForRoom = async (
  roomId: string
): Promise<FetchResult<{ messages: MessageType[] }>> => {
  return fetchFromApi<{ messages: MessageType[] }>(
    `/chat/messages/${roomId}`,

    {
      method: 'GET',
      auth: true,
    }
  );
};
