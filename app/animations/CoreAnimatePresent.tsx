import type { CompProps } from '@/typings/props';
import { AnimatePresence, usePresenceData } from 'motion/react';

export default function AnimatePresentProjects({ children }: CompProps) {
  const direction = usePresenceData();
  return (
    <AnimatePresence
      custom={direction}
      initial={false}
      mode="popLayout"
    >
      {children}
    </AnimatePresence>
  );
}
