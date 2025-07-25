import type { Metadata } from 'next';

import { SpeedInsights } from '@vercel/speed-insights/next';
import { toPlainText } from 'next-sanity';
// eslint-disable-next-line camelcase
import { Inter, JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { Toaster } from 'sonner';

import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { settingsQuery } from '@/sanity/lib/queries';
import { resolveOpenGraphImage } from '@/sanity/lib/utils';
import { handleError } from './client-utils';
import './globals.css';

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
      path: './fonts/TuskerGrotesk-5500Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/TuskerGrotesk-5600Semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/TuskerGrotesk-6600Semibold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/TuskerGrotesk-7700Bold.woff2',
      weight: '800',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-tusker',
});

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  display: 'swap',
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetBrainsMono.variable} ${tuskerGrotesk.variable} bg-white text-black`}>
      <body>
        <section className="min-h-screen pt-24">
          {/* The <Toaster> component is responsible for rendering toast notifications used in /app/client-utils.ts and /app/components/DraftModeToast.tsx */}
          <Toaster />
          {/* The <SanityLive> component is responsible for making all sanityFetch calls in your application live, so should always be rendered. */}
          <SanityLive onError={handleError} />
          <Header />
          <main className="">{children}</main>
          <Footer />
        </section>
        <SpeedInsights />
      </body>
    </html>
  );
}
