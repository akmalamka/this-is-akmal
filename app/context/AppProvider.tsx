'use client';

import type { LenisRef } from 'lenis/react';
import type { RefObject } from 'react';
import { createContext, useContext, useRef, useState } from 'react';

interface AppContextType {
  ctaText: string;
  setCtaText: (newText: string) => void;
  lenisRef: RefObject<LenisRef>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [ctaText, setCtaText] = useState('');
  const lenisRef = useRef<LenisRef>(null);

  return (
    <AppContext.Provider value={{ ctaText, setCtaText, lenisRef }}>
      {children}
    </AppContext.Provider>
  );
}

export function useCtaText() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useCtaText must be used within an AppProvider');
  }
  const { ctaText, setCtaText } = context;
  return { ctaText, setCtaText };
}

export function useLenisRef() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useLenisRef must be used within an AppProvider');
  }
  const { lenisRef } = context;
  return { lenisRef };
}
