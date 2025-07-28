import { sanityFetch } from '@/sanity/lib/live';
import { allProjectsQuery } from '@/sanity/lib/queries';
import Hobbies from './components/Hobbies';
import Intro from './components/Intro';
import Projects from './components/Projects';

export default async function Page() {
  const { data: projects } = await sanityFetch({ query: allProjectsQuery });
  return (
    <div className="container">
      <div className="relative min-h-[40vh] flex flex-col items-center justify-center gap-30">
        <Intro />
        <Projects projects={projects} />
        <Hobbies />
      </div>
    </div>
  );
}
