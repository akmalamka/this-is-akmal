'use client';

import { ReactLenis } from 'lenis/react';
import { cancelFrame, frame } from 'motion';
import { useEffect } from 'react';
import { useAppProvider } from '@/context/AppProvider';

export default function CoreLenisScroll({ children }: { children: React.ReactNode }) {
  const { lenisRef } = useAppProvider();

  useEffect(() => {
    function update(data: { timestamp: number }) {
      const time = data.timestamp;
      lenisRef.current?.lenis?.raf(time);
    }

    frame.update(update, true);

    return () => cancelFrame(update);
  }, []);

  return (
    <>
      <ReactLenis root options={{ autoRaf: false }} ref={lenisRef} />
      {children}
    </>
  );
}
