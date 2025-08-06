import dynamic from 'next/dynamic';
import Intro from '@/components/Intro';
import { sanityFetch } from '@/sanity/live';
import { allHobbiesQuery, allProjectsQuery } from '@/sanity/queries';

const LazyLoadProjects = dynamic(() => import('@/components/Projects'));
const LazyLoadHobbies = dynamic(() => import('@/components/Hobbies'));

export default async function Page() {
  const { data: projects } = await sanityFetch({ query: allProjectsQuery });
  const { data: hobbies } = await sanityFetch({ query: allHobbiesQuery });
  return (
    <div className="container my-8 relative min-h-[40vh] flex flex-col items-center justify-center gap-30">
      <Intro />
      <LazyLoadProjects projects={projects} />
      <LazyLoadHobbies hobbies={hobbies} />
    </div>
  );
}
