import Link from 'next/link';
import CoreImage from '@/app/components/CoreImage';
import { sanityFetch } from '@/sanity/lib/live';
import { introductionQuery } from '@/sanity/lib/queries';

export default async function Intro() {
  const { data: intro } = await sanityFetch({ query: introductionQuery });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">{intro?.name}</h1>
      <p className="text-gray-700 mb-6">{intro?.description}</p>
      {intro?.image && (
        <CoreImage image={intro.image} priority />
      )}
      <Link href="/projects" className="inline-block bg-blue-500 text-white px-4 py-2 rounded">
        View Projects
      </Link>
    </div>
  );
}
