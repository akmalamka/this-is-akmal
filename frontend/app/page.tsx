import dynamic from 'next/dynamic';
import Intro from '@/app/components/Intro';
import { sanityFetch } from '@/sanity/lib/live';
import { allHobbiesQuery, allProjectsQuery } from '@/sanity/lib/queries';

const LazyLoadProjects = dynamic(() => import('@/app/components/Projects'));
const LazyLoadHobbies = dynamic(() => import('@/app/components/Hobbies'));

export default async function Page() {
  const { data: projects } = await sanityFetch({ query: allProjectsQuery });
  const { data: hobbies } = await sanityFetch({ query: allHobbiesQuery });
  return (
    <div className="container my-8">
      <div className="relative min-h-[40vh] flex flex-col items-center justify-center gap-30">
        <Intro />
        <LazyLoadProjects projects={projects} />
        <LazyLoadHobbies hobbies={hobbies} />
      </div>
    </div>
  );
}
