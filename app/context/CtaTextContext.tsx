'use client';

import { createContext, useContext, useState } from 'react';

interface CtaTextContextType {
  ctaText: string;
  setCtaText: (newText: string) => void;
}

const CtaTextContext = createContext<CtaTextContextType | undefined>(undefined);

export function CtaTextProvider({ children }: { children: React.ReactNode }) {
  const [ctaText, setCtaText] = useState('');

  return (
    <CtaTextContext.Provider value={{ ctaText, setCtaText }}>
      {children}
    </CtaTextContext.Provider>
  );
}

export function useCtaText() {
  const context = useContext(CtaTextContext);
  if (!context) {
    throw new Error('useCtaText must be used within an CtaTextProvider');
  }
  return context;
}
