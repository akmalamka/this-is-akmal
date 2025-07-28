import Hobbies from './components/Hobbies';
import Intro from './components/Intro';
import Projects from './components/Projects';

export default async function Page() {
  return (
    <div className="container">
      <div className="relative min-h-[40vh] flex flex-col items-center justify-center">
        <Intro />
        <Projects />
        <Hobbies />
      </div>
    </div>
  );
}
