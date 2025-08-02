'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Drawer } from 'vaul';
import CoreDrawer from '../core/CoreDrawer';
import LayoutHamburgerButton from './LayoutHamburgerButton';
import LayoutHeaderMobile from './LayoutHeaderMobile';

export default function LayoutHeader({ title }: { title?: string }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // TODO: close navbar when the route changes

  // TODO: close navbar when the width of the screen changes from mobile to desktop

  return (
    <header className=" text-white fixed z-20 left-0 top-0 w-screen justify-between mx-auto backdrop-blur-lg">
      {/* TODO: logo using my head when I was little, ask abang to edit it */}
      <div className="h-[var(--navbar-height)] flex items-center justify-between container">
        <Link className="gap-2 text-[20px] font-display uppercase font-semibold" href="/">
          {title}
        </Link>
        <nav className="hidden md:block">
          <ul
            role="list"
            className="flex items-center gap-12 text-[16px] font-mono uppercase font-light"
          >
            <li>
              <Link href="#projects" scroll={false}>Projects</Link>
            </li>
            <li>
              <Link href="#skills" scroll={false}>Skills</Link>
            </li>
            <li>
              <Link href="#hobbies" scroll={false}>Hobbies</Link>
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
        {/* TODO: make the drawer hidden in md screen */}
        <CoreDrawer
          state={[isDrawerOpen, setIsDrawerOpen]}
          trigger={(
            <Drawer.Trigger className="text-white md:hidden">
              <LayoutHamburgerButton
                isOpen={false}
                className=" bg-white text-black"
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              />
            </Drawer.Trigger>
          )}
        >
          <LayoutHeaderMobile />
        </CoreDrawer>
      </div>
    </header>
  );
}
