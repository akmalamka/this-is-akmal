import type { IntroductionQueryResult } from '@/studio/sanity.types';
import CoreParallaxImage from '@/core/CoreParallaxImage';
import CoreRotatedText from '@/core/CoreRotatedText';
import { client } from '@/sanity/client';
import { introductionQuery } from '@/sanity/queries';

export default async function Intro() {
  const intro = await client.fetch<IntroductionQueryResult>(
    introductionQuery,
  );

  return (
    <section className="text-white grid grid-cols-6 max-h-[80dvh] lg:max-h-[70dvh] lg:grid-cols-12 gap-6 lg:items-end" id="intro">
      <h2 className="font-mono text-[16px] uppercase col-span-6 lg:col-span-3 lg:self-start">Hi, it&apos;s me,</h2>
      <div className="grid lg:grid-cols-6 col-span-6 lg:justify-center lg:items-end relative">
        <CoreRotatedText as="h1" text={intro?.name || ''} className="col-span-6 lg:col-span-3" childrenClassName="text-[80px] sm:text-[100px] md:text-[140px] lg:text-[180px]" />
        {intro?.image && (
          <CoreParallaxImage imageType={null} image={intro.image} className="max-w-full h-[15dvh] lg:h-[70dvh] col-span-6 lg:col-span-3 lg:col-start-4 lg:self-end" priority />
        )}
      </div>
      <div className="col-span-6 lg:col-span-3 flex flex-col gap-6 lg:gap-15">
        <p className="font-sans text-[16px] font-extralight">{intro?.description}</p>
        <a
          href="mailto:akmalmuhammad51@gmail.com"
          target="_blank"
          rel="noreferrer noopener"
          className="w-fit font-mono py-2.5 px-6 bg-primary uppercase text-white border-4 border-white hover:bg-white hover:text-black transition-colors inline-block"
        >
          Let&apos;s talk
        </a>
      </div>
    </section>
  );
}
