import Link from 'next/link';
import { sanityFetch } from '@/sanity/lib/live';
import { settingsQuery } from '@/sanity/lib/queries';
import CoreDrawer from '../core/CoreDrawer';
import LayoutHamburgerButton from './LayoutHamburgerButton';
import LayoutHeaderMobile from './LayoutHeaderMobile';

export default async function Header() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  });

  return (
    <header className=" text-white fixed z-20 left-0 top-0 w-screen justify-between mx-auto backdrop-blur-lg">
      {/* TODO: logo using my head when I was little, ask abang to edit it */}
      <div className="h-24 flex items-center justify-between container">
        <Link className="gap-2 text-white text-[20px] font-display uppercase font-semibold" href="/">
          {settings?.title}
        </Link>
        <nav className="hidden md:block">
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
        <Link
          href="mailto:akmalmuhammad51@gmail.com"
          target="_blank"
          rel="noreferrer noopener"
          className="font-mono py-2.5 px-6 bg-primary uppercase text-white border-4 border-white hover:bg-white hover:text-black transition-colors hidden md:inline-block"
        >
          Let&apos;s talk
        </Link>

        <CoreDrawer
          trigger={
            <LayoutHamburgerButton isOpen={false} className=" bg-white text-black" />
          }
        >
          <LayoutHeaderMobile />
        </CoreDrawer>
      </div>
    </header>
  );
}
