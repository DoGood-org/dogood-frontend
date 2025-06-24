import { ArrowRight, LogIn, LogOut } from '@/components/icons';

export const iconComponents: Record<string, React.ReactNode> = {
  LogIn: <LogIn className="size-6" />,
  ArrowRight: <ArrowRight className="size-6" />,
  LogOut: <LogOut className="size-6" />,
};

export type IconName = keyof typeof iconComponents;
