'use client';

import dynamic from 'next/dynamic';

export const CoreCursorClient = dynamic(() =>
  import('./cursor/CoreCursor'), { ssr: false });
