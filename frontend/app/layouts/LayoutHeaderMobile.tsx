'use client';

import Link from 'next/link';

export default function LayoutHeaderMobile({ onClick }: { onClick: () => void }) {
  return (
    <div className="h-[calc(100dvh-var(--navbar-height))] pb-5 flex flex-col justify-between md:hidden">
      <div className="flex flex-col gap-y-8 text-[24px] font-mono uppercase font-light ">
        <Link
          onClick={onClick}
          href="/"
        >
          Home
        </Link>
        <Link
          onClick={onClick}
          href="#projects"
        >
          Projects
        </Link>
        <Link
          onClick={onClick}
          href="#hobbies"
        >
          Hobbies
        </Link>
      </div>

      <Link
        href="mailto:akmalmuhammad51@gmail.com"
        target="_blank"
        rel="noreferrer noopener"
        className="font-mono py-2.5 px-6 bg-primary uppercase text-white border-4 border-black hover:bg-white hover:text-black transition-colors text-center"
      >
        Let&apos;s talk
      </Link>
    </div>
  );
}
