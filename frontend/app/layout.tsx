import type { Metadata } from 'next';

import { toPlainText } from 'next-sanity';
import localFont from 'next/font/local';
import { Toaster } from 'sonner';
import CoreRunningText from '@/app/core/CoreRunningText';
import Footer from '@/app/layouts/LayoutFooter';

import Header from '@/app/layouts/LayoutHeader';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { settingsQuery } from '@/sanity/lib/queries';
import { resolveOpenGraphImage } from '@/sanity/lib/utils';
import { handleError } from './client-utils';
import { CtaTextProvider } from './context/CtaTextContext';
import LenisScroll from './core/CoreLenisScroll';
import CoreCursor from './core/cursor/CoreCursor';
import './globals.css';

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
// TODO: add favicon
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
      path: './fonts/tuskerGrotesk/TuskerGrotesk-3700Bold.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/tuskerGrotesk/TuskerGrotesk-5500Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/tuskerGrotesk/TuskerGrotesk-5600Semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/tuskerGrotesk/TuskerGrotesk-6600Semibold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/tuskerGrotesk/TuskerGrotesk-7700Bold.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-tusker',
});

// TODO: investigate why next/font/google doesn't work for Inter and Jetbrain Mono
const inter = localFont({
  src: [
    {
      path: './fonts/inter/Inter-ExtraLight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: './fonts/inter/Inter-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/inter/Inter-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/inter/Inter-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/inter/Inter-Semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/inter/Inter-Bold.woff2',
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
      path: './fonts/jetbrainsMono/JetBrainsMono-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/jetbrainsMono/JetBrainsMono-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/jetbrainsMono/JetBrainsMono-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/jetbrainsMono/JetBrainsMono-Semibold.woff2',
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
        <LenisScroll>
          <CtaTextProvider>
            <CoreCursor />
            <section className="min-h-screen pt-24">
              {/* The <Toaster> component is responsible for rendering toast notifications used in /app/client-utils.ts and /app/components/DraftModeToast.tsx */}
              <Toaster />
              {/* The <SanityLive> component is responsible for making all sanityFetch calls in your application live, so should always be rendered. */}
              <SanityLive onError={handleError} />
              {/* TODO: decide whether to use running text or not */}
              <CoreRunningText />
              <Header />

              {/* TODO: fix hydration mismatch, detail in console */}
              <main className="">{children}</main>
              <Footer />
            </section>
          </CtaTextProvider>
        </LenisScroll>
      </body>
    </html>
  );
}
