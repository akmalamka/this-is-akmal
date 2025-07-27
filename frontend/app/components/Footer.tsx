import Link from 'next/link';
import { sanityFetch } from '@/sanity/lib/live';
import { allSocialsQuery } from '@/sanity/lib/queries';

export default async function Footer() {
  const { data: socials } = await sanityFetch({ query: allSocialsQuery });
  return (
    <footer className="relative">
      <div className="container mx-auto px-4 py-8">
        <div className="font-sans font-light text-[28px] flex justify-between text-white">
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
        <span className="font-display font-extrabold text-[400px] uppercase text-white">
          Cool
        </span>
        <div className="flex justify-between items-center text-[20px]">
          <Link className="gap-2 text-white font-display uppercase font-light" href="/">
            This is Akmal
          </Link>
          <ul className="flex text-white ">
            {socials?.map((social, index) => (
              <li key={social._id}>
                <a
                  href={social.url.href}
                  target={social.url.openInNewTab ? '_blank' : '_self'}
                  rel={social.url.openInNewTab ? 'noopener noreferrer' : undefined}
                  className="font-sans font-medium  uppercase hover:underline"
                >
                  {social.title}
                </a>
                {index < socials.length - 1 ? ',' : ''}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-between items-center text-white my-4">
          <span className="font-mono text-[14px] uppercase">
            { new Date().getFullYear() }
            {' '}
            © Muhammad Akmal
          </span>
          <div className="font-sans text-[16px]">
            made with
            {' '}
            <span className="text-primary">
              ❤
            </span>
          </div>
          <span className="font-mono text-[14px] uppercase">
            Design and Development by Muhammad Akmal
          </span>
        </div>

      </div>
    </footer>
  );
}
