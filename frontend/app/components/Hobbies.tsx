import Link from 'next/link';
import CoreImage from '@/app/components/CoreImage';
import { sanityFetch } from '@/sanity/lib/live';
import { allHobbiesQuery } from '@/sanity/lib/queries';

export default async function Hobbies() {
  const { data: hobbies } = await sanityFetch({ query: allHobbiesQuery });

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Hobbies</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {hobbies.map((hobby) => (
          <div key={hobby._id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold">{hobby.title}</h3>
            <p className="mt-2 text-gray-600">{hobby.description}</p>
            {hobby.image && (
              <CoreImage image={hobby.image} priority />
            )}
            {hobby.ctaButton && (
              <Link href={hobby.ctaButton.link} className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">
                {hobby.ctaButton.text}
              </Link>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
