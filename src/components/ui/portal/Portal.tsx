'use client';
import { JSX, ReactNode, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
  children: ReactNode;
};

const Portal: React.FC<Props> = ({ children }: Props): JSX.Element | null => {
  const [mounted, setMounted] = useState(false);

  useEffect((): (() => void) => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return createPortal(children, document.body);
};

export default Portal;
