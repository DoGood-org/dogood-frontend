import { Chat } from '@/components/account/chatPage/Chat';
import { JSX } from 'react';

export default async function AdminSupportPage(): Promise<JSX.Element> {
  return <Chat className="!py-0 w-full h-full flex flex-col" />;
}
