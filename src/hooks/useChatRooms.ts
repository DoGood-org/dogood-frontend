import { useCallback, useEffect, useState } from 'react';
import { ChatType } from '@/types/chatType';
import { getChatRooms } from '@/services/chatService';

interface UseChatRoomsReturn {
  rooms: ChatType[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useChatRooms = (): UseChatRoomsReturn => {
  const [rooms, setRooms] = useState<ChatType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const refetch = useCallback((): void => {
    setReloadKey((k) => k + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;

    setIsLoading(true);
    setError(null);

    (async (): Promise<void> => {
      const res = await getChatRooms();
      if (cancelled) return;

      if ('data' in res) {
        setRooms(res.data.rooms ?? []);
      } else {
        setRooms([]);
        setError('Unable to load chats');
      }

      setIsLoading(false);
    })();

    return (): void => {
      cancelled = true;
    };
  }, [reloadKey]);

  return { rooms, isLoading, error, refetch };
};
