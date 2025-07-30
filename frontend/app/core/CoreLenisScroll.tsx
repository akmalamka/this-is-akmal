// components/LenisScroll.tsx
'use client';

// TODO: fix motion animation glitch on carousel
import type { LenisRef } from 'lenis/react';
import { ReactLenis } from 'lenis/react';
import { cancelFrame, frame } from 'motion';
import { useEffect, useRef } from 'react';

export default function LenisScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<LenisRef>(null);

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
