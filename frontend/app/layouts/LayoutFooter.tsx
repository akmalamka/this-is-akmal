import Link from 'next/link';
import { sanityFetch } from '@/sanity/lib/live';
import { allSocialsQuery } from '@/sanity/lib/queries';

export default async function LayoutFooter() {
  const { data: socials } = await sanityFetch({ query: allSocialsQuery });
  return (
    <footer className="relative">
      <div className="container mx-auto px-4 py-8 flex flex-col gap-24 md:gap-4">
        {/* TODO: for next release, we should make this up! */}
        {/* <div className="font-sans font-light text-[28px] flex justify-between text-white">
          <span>
            let's
          </span>
          <span>
            make
          </span>
          <span>
            something
          </span>
        </div>
        <span className="font-tusker font-extrabold text-[400px] uppercase text-white">
          Cool
        </span> */}
        <div className="flex flex-col gap-4 md:flex-row justify-between items-center">
          <Link className="text-white text-body uppercase text-[100px] md:text-[20px]" href="/">
            This is Akmal
          </Link>
          <ul className="inline-flex text-white justify-between w-full md:w-fit">
            {/* TODO: add microinteraction like in C2 Montreal */}
            {socials?.map((social, index) => (
              <li key={social._id}>
                <a
                  href={social.url.href}
                  target={social.url.openInNewTab ? '_blank' : '_self'}
                  rel={social.url.openInNewTab ? 'noopener noreferrer' : undefined}
                  className="text-links uppercase hover:underline"
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
        {/* TODO: should we add go back to top? */}
        <div className="flex justify-between items-center text-white my-4 text-center flex-col md:flex-row">
          <span className="text-caption uppercase">
            { new Date().getFullYear() }
            {' '}
            © Muhammad Akmal
          </span>
          <span className="text-caption uppercase">
            Design and Development with
            {' '}
            <span className="text-primary text-sh1">
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
