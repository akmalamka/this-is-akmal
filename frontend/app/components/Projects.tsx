import CoreImage from '@/app/core/CoreImage';
import { sanityFetch } from '@/sanity/lib/live';
import { allProjectsQuery } from '@/sanity/lib/queries';

export default async function Projects() {
  const { data: projects } = await sanityFetch({ query: allProjectsQuery });

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project._id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-xl font-semibold">{project.title}</h3>
            <p className="mt-2 text-gray-600">{project.client}</p>
            <p className="mt-1 text-gray-500">{project.role}</p>
            <p className="mt-1 text-gray-500">{project.dateDuration}</p>
            {project.image && (
              <CoreImage image={project.image} priority />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
