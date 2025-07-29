import Link from 'next/link';
import { sanityFetch } from '@/sanity/lib/live';
import { settingsQuery } from '@/sanity/lib/queries';

export default async function Header() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  });

  return (
    <header className=" text-white fixed z-50 left-0 top-0 w-screen justify-between mx-auto backdrop-blur-lg">
      <div className="h-24 flex items-center justify-between container">
        <Link className="gap-2 text-white text-xl font-display uppercase font-light" href="/">
          {settings?.title}
        </Link>
        <nav>
          <ul
            role="list"
            className="flex items-center gap-12 text-[16px] font-mono uppercase font-light"
          >
            <li>
              <Link href="#projects">Projects</Link>
            </li>
            <li>
              <Link href="#skills">Skills</Link>
            </li>
            <li>
              <Link href="#hobbies">Hobbies</Link>
            </li>

          </ul>
        </nav>
        {/* TODO: add microinteraction like in ftrprf */}
        <a
          href="mailto:akmalmuhammad51@gmail.com"
          target="_blank"
          rel="noreferrer noopener"
          className="font-mono py-2.5 px-6 bg-primary uppercase text-white border-4 border-white hover:bg-white hover:text-black transition-colors inline-block"
        >
          Let&apos;s talk
        </a>
      </div>
    </header>
  );
}
