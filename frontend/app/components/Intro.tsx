import CoreImage from '@/app/core/CoreImage';
import CoreRotatedText from '@/app/core/CoreRotatedText';
import { sanityFetch } from '@/sanity/lib/live';
import { introductionQuery } from '@/sanity/lib/queries';

export default async function Intro() {
  const { data: intro } = await sanityFetch({ query: introductionQuery });

  return (
    <div className="text-white grid grid-cols-12 gap-6 items-end">
      <h2 className="font-mono text-[16px] uppercase col-span-3 self-start">Hi, it&apos;s me,</h2>
      <div className="grid grid-cols-6 justify-center items-end col-span-6 relative">
        <CoreRotatedText text={intro?.name || ''} className="col-span-3" childrenClassName="text-[250px]" />
        {intro?.image && (
          <CoreImage image={intro.image} className="max-w-[300px] h-[70dvh] col-span-3 col-start-4" priority />
        )}
      </div>
      <div className="col-span-3 flex flex-col gap-15">
        <p className="font-sans text-[18px]">{intro?.description}</p>
        <a
          href="mailto:akmalmuhammad51@gmail.com"
          target="_blank"
          rel="noreferrer noopener"
          className="w-fit font-mono py-2.5 px-6 bg-primary uppercase text-white border-4 border-white hover:bg-white hover:text-black transition-colors inline-block"
        >
          Let&apos;s talk
        </a>
      </div>
    </div>
  );
}
