import Hobbies from './components/Hobbies';
import Intro from './components/Intro';
import Projects from './components/Projects';

export default async function Page() {
  return (
    <>
      <div className="relative">
        <div className="relative">
          <div className="bg-gradient-to-b from-white w-full h-full absolute top-0"></div>
          <div className="container">
            <div className="relative min-h-[40vh] mx-auto max-w-2xl pt-10 xl:pt-20 pb-30 space-y-6 lg:max-w-4xl lg:px-12 flex flex-col items-center justify-center">
              <p className="font-sans">This uses Inter</p>
              <code className="font-mono font-light uppercase">This uses JetBrains Mono</code>
              <Intro />
              <Projects />
              <Hobbies />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
