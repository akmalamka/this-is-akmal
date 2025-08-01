import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="text-white fixed inset-0 h-screen bg-black z-10">
      <div className="h-full flex flex-col text-center gap-6 text-white container justify-center items-center">
        <h2 className="font-display font-semibold text-[110px]">
          404
        </h2>
        <p
          className="text-sh2"
        >
          Nothing to see here. The page or URL you are looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="font-mono w-fit py-2.5 px-6 bg-primary uppercase text-white border-4 border-white hover:bg-white hover:text-black transition-colors inline-block"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
