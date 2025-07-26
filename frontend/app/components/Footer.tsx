import { sanityFetch } from '@/sanity/lib/live';
import { allSocialsQuery } from '@/sanity/lib/queries';

export default async function Footer() {
  const { data: socials } = await sanityFetch({ query: allSocialsQuery });
  return (
    <footer className="bg-gray-50 relative">
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-4">Connect with me</h2>
        <ul className="flex space-x-4">
          {socials?.map((social) => (
            <li key={social._id}>
              <a
                href={social.url.href}
                target={social.url.openInNewTab ? '_blank' : '_self'}
                rel={social.url.openInNewTab ? 'noopener noreferrer' : undefined}
                className="text-blue-600 hover:underline"
              >
                {social.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
