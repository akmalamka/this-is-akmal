import type { Metadata } from 'next';

import { toPlainText } from 'next-sanity';
import localFont from 'next/font/local';
import { Toaster } from 'sonner';
import { handleError } from '@/client-utils';
import { AppProvider } from '@/context/AppProvider';
import CoreLenisScroll from '@/core/CoreLenisScroll';
import CoreRunningText from '@/core/CoreRunningText';
import LayoutFooter from '@/layouts/LayoutFooter';
import LayoutHeader from '@/layouts/LayoutHeader';
import { sanityFetch, SanityLive } from '@/sanity/live';
import { settingsQuery } from '@/sanity/queries';
import { resolveOpenGraphImage } from '@/sanity/utils';
import { CoreCursorClient } from './core';
import '@/globals.css';

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  });
  const title = settings?.title;
  const description = settings?.description;

  const ogImage = resolveOpenGraphImage(settings?.ogImage);
  let metadataBase: URL | undefined;
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined;
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title!,
    },
    description: toPlainText(description!),
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  };
}

const tuskerGrotesk = localFont({
  src: [
    {
      path: 'fonts/tusker-grotesk/tuskergrotesk-3700bold.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: 'fonts/tusker-grotesk/tuskergrotesk-5500medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: 'fonts/tusker-grotesk/tuskergrotesk-5600semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: 'fonts/tusker-grotesk/tuskergrotesk-6600semibold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: 'fonts/tusker-grotesk/tuskergrotesk-7700bold.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-tusker',
});

// TODO: investigate why next/font/google doesn't work for Inter and Jetbrains Mono
const inter = localFont({
  src: [
    {
      path: 'fonts/inter/inter-extralight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: 'fonts/inter/inter-light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: 'fonts/inter/inter-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: 'fonts/inter/inter-medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: 'fonts/inter/inter-semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: 'fonts/inter/inter-bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-inter',
});

const jetbrainsMono = localFont({
  src: [
    {
      path: 'fonts/jetbrains-mono/jetbrainsmono-light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: 'fonts/jetbrains-mono/jetbrainsmono-regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: 'fonts/jetbrains-mono/jetbrainsmono-medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: 'fonts/jetbrains-mono/jetbrainsmono-semibold.woff2',
      weight: '600',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-jetbrains-mono',
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${tuskerGrotesk.variable} bg-white text-black`}>
      <body>
        {/* TODO: hydration mismatch, detail in console */}
        <AppProvider>
          <CoreLenisScroll>
            <CoreCursorClient />
            <section className="min-h-screen pt-[var(--navbar-height)]">
              {/* The <Toaster> component is responsible for rendering toast notifications used in /app/client-utils.ts */}
              <Toaster />
              {/* The <SanityLive> component is responsible for making all sanityFetch calls in your application live, so should always be rendered. */}
              <SanityLive onError={handleError} />
              <CoreRunningText />
              <LayoutHeader />
              {/* TODO: disable aria-hidden in main so that no warning appear about aria-hidden */}
              <main>{children}</main>
              <LayoutFooter />
            </section>
          </CoreLenisScroll>
        </AppProvider>

      </body>
    </html>
  );
}
