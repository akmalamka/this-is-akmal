import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="text-white fixed inset-0 h-screen bg-black z-10">
      <div className="h-full flex-vertical-center text-center gap-6 container">
        <h2 className="text-h3 font-semibold">
          404
        </h2>
        <p
          className="text-sh2"
        >
          Nothing to see here. The page or URL you are looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="text-label w-fit py-2.5 px-6 bg-primary uppercase border-4 border-white hover:(bg-white text-black) transition-colors inline-block"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
