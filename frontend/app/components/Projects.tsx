import CoreImage from '@/app/core/CoreImage';
import CoreRotatedText from '@/app/core/CoreRotatedText';
import { sanityFetch } from '@/sanity/lib/live';
import { allProjectsQuery } from '@/sanity/lib/queries';
import CoreArrowCircle from '../core/CoreArrowCircle';

export default async function Projects() {
  const { data: projects } = await sanityFetch({ query: allProjectsQuery });

  return (
    <div className="text-white grid grid-cols-12 gap-6 items-end">
      <div className="col-span-3 flex flex-col justify-between h-full">
        <div>
          <h2 className="font-mono text-[16px] uppercase ">Projects</h2>
          <h3 className="font-sans text-[16px] max-w-[230px]">
            Something that I am proud to work on, even though it&apos;s not that much
          </h3>
        </div>
        <div className="font-display">
          <span className="text-[130px] leading-[100%]">
            01
          </span>
          <span className="text-[75px] leading-[100%]">
            /10
          </span>
        </div>
      </div>
      <div className="grid grid-cols-6 justify-center items-end col-span-6 relative">
        {projects[0]?.image && (
          <CoreImage image={projects[0].image} className="max-w-[300px] h-[70dvh] col-span-3" priority />
        )}
        <CoreRotatedText text={projects[0].title || ''} className="col-span-3" childrenClassName="text-[107px]" />

      </div>
      <div className="col-span-3 flex flex-col justify-between h-full items-end">
        <div className="flex gap-2">
          <CoreArrowCircle />
          <CoreArrowCircle className="rotate-180" />
        </div>
        <div className="flex flex-col gap-9">
          <div>
            <h4 className="font-sans text-[16px] uppercase font-bold">
              Client
            </h4>
            <h5 className="font-sans font-extralight text-[20px]">{projects[0].client}</h5>
          </div>
          <div>
            <h4 className="font-sans text-[16px] uppercase font-bold">
              Role
            </h4>
            <h5 className="font-sans font-extralight text-[20px]">{projects[0].role}</h5>
          </div>
          <h5 className="font-sans font-semibold text-[16px] uppercase">{projects[0].dateDuration}</h5>
        </div>

      </div>
    </div>
    // <div className="container mx-auto px-4 py-8">
    //   <h2 className="text-2xl font-bold mb-6">Projects</h2>
    //   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //     {projects.map((project) => (
    //       <div key={project._id} className="bg-white p-4 rounded-lg shadow">
    //         <h3 className="text-xl font-semibold">{project.title}</h3>
    //         <p className="mt-2 text-gray-600">{project.client}</p>
    //         <p className="mt-1 text-gray-500">{project.role}</p>
    //         <p className="mt-1 text-gray-500">{project.dateDuration}</p>
    //         {project.image && (
    //           <CoreImage image={project.image} priority />
    //         )}
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
}
