'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useState } from 'react';
import { Drawer } from 'vaul';
import LayoutHamburgerButton from './LayoutHamburgerButton';
import LayoutHeaderMobile from './LayoutHeaderMobile';

const LazyLoadCoreDrawer = dynamic(() => import('@/core/CoreDrawer'));

export default function LayoutHeader({ title }: { title?: string }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <header className="text-white fixed z-20 left-0 top-0 w-screen justify-between mx-auto backdrop-blur-lg">
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
              <Link href="#projects">Projects</Link>
            </li>
            <li>
              <Link href="#hobbies">Hobbies</Link>
            </li>
          </ul>
        </nav>
        <Link
          href="mailto:akmalmuhammad51@gmail.com"
          target="_blank"
          rel="noreferrer noopener"
          className="font-mono py-2.5 px-6 bg-primary uppercase text-white border-4 border-white hover:bg-white hover:text-black transition-colors hidden md:inline-block"
        >
          Let&apos;s talk
        </Link>
        <LazyLoadCoreDrawer
          state={[isDrawerOpen, setIsDrawerOpen]}
          trigger={(
            <Drawer.Trigger className="text-white md:hidden" aria-label="hamburger button">
              {/* TODO: Make sure the focus can be removed before it was being hide, detail in warning console */}
              <LayoutHamburgerButton
                isOpen={false}
                className=" bg-white text-black"
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              />
            </Drawer.Trigger>
          )}
        >
          <LayoutHeaderMobile onClick={() => setIsDrawerOpen(false)} />
        </LazyLoadCoreDrawer>
      </div>
    </header>
  );
}
