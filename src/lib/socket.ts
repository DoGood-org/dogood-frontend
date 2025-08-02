import { io, Socket } from 'socket.io-client';

let socketInstance: Socket | null = null;

export const createSocket = (): Socket | null => {
  if (typeof window === 'undefined') return null;
  if (socketInstance) return socketInstance;

  const isSecure = process.env.NODE_ENV === 'production';
  const port = isSecure
    ? process.env.NEXT_PUBLIC_WS_SECURE_PORT
    : process.env.NEXT_PUBLIC_WS_PORT;

  if (!port) return null;

  socketInstance = io(
    `${isSecure ? 'https' : 'http'}://${window.location.hostname}:${port}`,
    {
      withCredentials: true,
      transports: ['websocket'],
    }
  );

  return socketInstance;
};
