import Link from 'next/link';
import { sanityFetch } from '@/sanity/lib/live';
import { allSocialsQuery } from '@/sanity/lib/queries';

export default async function LayoutFooter() {
  const { data: socials } = await sanityFetch({ query: allSocialsQuery });
  return (
    <footer className="relative">
      <div className="container mx-auto px-4 py-8 flex flex-col gap-24 md:gap-4">

        <div className="flex flex-col gap-4 md:flex-row justify-between items-center">
          <Link className="text-white text-center font-display uppercase font-semibold text-[100px] md:text-[20px]" href="/">
            This is Akmal
          </Link>
          <ul className="inline-flex text-white justify-between w-full md:w-fit">
            {/* TODO: add microinteraction like in C2 Montreal. Priority: low */}
            {socials?.map((social, index) => (
              <li key={social._id}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-[16px] font-medium uppercase hover:underline"
                >
                  {social.title}
                </a>
                <span className="hidden md:inline-block">
                  {index < socials.length - 1 ? ',' : ''}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-between items-center text-white my-4 text-center flex-col md:flex-row">
          <span className="font-mono text-[14px] uppercase" suppressHydrationWarning>
            { new Date().getFullYear() }
            {' '}
            © Muhammad Akmal
          </span>
          <span className="font-mono text-[14px] uppercase">
            Design and Development with
            {' '}
            <span className="text-primary font-sans text-[24px]">
              ❤
            </span>
            {' '}
            by Muhammad Akmal
          </span>
        </div>

      </div>
    </footer>
  );
}
