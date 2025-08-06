'use client';

import type { LenisRef } from 'lenis/react';
import type { RefObject } from 'react';
import { createContext, useContext, useRef, useState } from 'react';

interface CtaPropsProps { text?: string; className?: string };
interface AppContextType {
  ctaProps: CtaPropsProps;
  setCtaProps: (newProps: CtaPropsProps) => void;
  isImageHovered: boolean;
  setIsImageHovered: (newValue: boolean) => void;
  lenisRef: RefObject<LenisRef>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [ctaProps, setCtaProps] = useState<CtaPropsProps>({ text: '', className: '' });
  const [isImageHovered, setIsImageHovered] = useState(false);
  const lenisRef = useRef<LenisRef>(null);

  return (
    <AppContext.Provider value={{ ctaProps, setCtaProps, isImageHovered, setIsImageHovered, lenisRef }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppProvider() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useProvider must be used within an AppProvider');
  }
  return context;
}
