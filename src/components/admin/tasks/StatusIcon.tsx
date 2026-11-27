import { JSX } from 'react';
import { Approved, Pending, Rejected } from '@/components/icons';

type Renderer = (props: { className?: string }) => JSX.Element;

const ICONS: Record<string, Renderer> = {
  'under consideration': (p) => <Pending {...p} />,
  completed: (p) => <Approved {...p} />,
  confirmed: (p) => <Approved {...p} />,
  rejected: (p) => <Rejected {...p} />,
  pending: (p) => <Pending {...p} />,
};

export const StatusIcon = ({
  status,
  className = 'h-5 w-5',
}: {
  status: string;
  className?: string;
}): JSX.Element | null => {
  const render = ICONS[status?.toLowerCase?.() ?? ''];
  return render ? render({ className }) : null;
};
