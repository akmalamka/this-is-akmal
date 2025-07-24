'use server';

import { draftMode } from 'next/headers';

export async function disableDraftMode() {
  'use server';
  await Promise.allSettled([
    (await draftMode()).disable(),
    // Simulate a delay to show the loading state
    // eslint-disable-next-line no-promise-executor-return
    new Promise((resolve) => setTimeout(resolve, 1000)),
  ]);
}
