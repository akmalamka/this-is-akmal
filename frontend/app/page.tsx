import Hobbies from '@/app/components/Hobbies';
import Intro from '@/app/components/Intro';
import Projects from '@/app/components/Projects';
import { sanityFetch } from '@/sanity/lib/live';
import { allHobbiesQuery, allProjectsQuery } from '@/sanity/lib/queries';

export default async function Page() {
  const { data: projects } = await sanityFetch({ query: allProjectsQuery });
  const { data: hobbies } = await sanityFetch({ query: allHobbiesQuery });
  return (
    <div className="container my-8">
      <div className="relative min-h-[40vh] flex flex-col items-center justify-center gap-30">
        <Intro />
        <Projects projects={projects} />
        <Hobbies hobbies={hobbies} />
      </div>
    </div>
  );
}
