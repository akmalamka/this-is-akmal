import type { Metadata } from 'next';

import type { SettingsQueryResult } from './studio/sanity.types';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { toPlainText } from 'next-sanity';
import dynamic from 'next/dynamic';
import localFont from 'next/font/local';
import { AppProvider } from '@/context/AppProvider';
import CoreLenisScroll from '@/core/CoreLenisScroll';
import CoreRunningText from '@/core/CoreRunningText';
import LayoutHeader from '@/layouts/LayoutHeader';
import { settingsQuery } from '@/sanity/queries';
import { resolveOpenGraphImage } from '@/sanity/utils';
import { CoreCursorClient } from './core';
import { client } from './sanity/client';
import '@/globals.css';

const LazyLoadLayoutFooter = dynamic(() => import('@/layouts/LayoutFooter'));

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch<SettingsQueryResult>(
    settingsQuery,
    {},
    {
    // Metadata should never contain stega
      stega: false,
    },
  );
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
  const settings = await client.fetch<SettingsQueryResult>(
    settingsQuery,
    {},
    {
    // Metadata should never contain stega
      stega: false,
    },
  );

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${tuskerGrotesk.variable} bg-white text-black`}>
      <body>
        {/* TODO: hydration mismatch, detail in console */}
        <AppProvider>
          <CoreLenisScroll>
            <CoreCursorClient />
            <section className="min-h-screen pt-[var(--navbar-height)]">
              <CoreRunningText />
              <LayoutHeader title={settings?.title} />
              <main>{children}</main>
              <LazyLoadLayoutFooter />
            </section>
          </CoreLenisScroll>
        </AppProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
