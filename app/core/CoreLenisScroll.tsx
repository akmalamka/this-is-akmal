'use client';

// TODO: fix motion animation glitch on carousel
import { ReactLenis } from 'lenis/react';
import { cancelFrame, frame } from 'motion';
import { useEffect } from 'react';
import { useLenisRef } from '@/context/AppProvider';

export default function CoreLenisScroll({ children }: { children: React.ReactNode }) {
  const { lenisRef } = useLenisRef();

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
