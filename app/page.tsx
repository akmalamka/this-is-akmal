import type { AllHobbiesQueryResult, AllProjectsQueryResult } from './studio/sanity.types';
import dynamic from 'next/dynamic';
import Intro from '@/components/Intro';
import { allHobbiesQuery, allProjectsQuery } from '@/sanity/queries';
import { client } from './sanity/client';

const LazyLoadProjects = dynamic(() => import('@/components/Projects'));
const LazyLoadHobbies = dynamic(() => import('@/components/Hobbies'));

export default async function Page() {
  const projects = await client.fetch<AllProjectsQueryResult>(
    allProjectsQuery,
  );
  const hobbies = await client.fetch<AllHobbiesQueryResult>(
    allHobbiesQuery,
  );
  return (
    <div className="container my-8 relative min-h-[40vh] flex flex-col items-center justify-center gap-30">
      <Intro />
      <LazyLoadProjects projects={projects} />
      <LazyLoadHobbies hobbies={hobbies} />
    </div>
  );
}
