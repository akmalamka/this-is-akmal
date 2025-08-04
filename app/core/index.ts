'use client';

import dynamic from 'next/dynamic';

export const CoreCursorClient = dynamic(() =>
  import('./CoreCursor'), { ssr: false });
