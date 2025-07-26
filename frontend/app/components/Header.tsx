import Link from 'next/link';
import { sanityFetch } from '@/sanity/lib/live';
import { settingsQuery } from '@/sanity/lib/queries';

export default async function Header() {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
  });

  return (
    <header className="fixed z-50 h-24 inset-0 flex items-center backdrop-blur-lg">
      <div className="container py-6 px-2 sm:px-6">
        <div className="flex items-center justify-between gap-5">
          <Link className="flex items-center gap-2 text-white" href="/">
            <span className="font-display font-semibold text-[24px] uppercase">
              {settings?.title}
            </span>
          </Link>

          <nav>
            <ul
              role="list"
              className="text-white flex items-center gap-4 md:gap-6 leading-5 text-[16px] font-mono"
            >
              <li>
                Hi, it&apos;s me
              </li>
              <li>
                Projects
              </li>
              <li>
                Skills
              </li>
              <li>
                Hobbies
              </li>
              <li>
                Let&apos;s talk
              </li>

            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
