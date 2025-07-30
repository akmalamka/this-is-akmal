import Link from 'next/link';

interface CoreLinkProps {
  link: any;
  children: React.ReactNode;
  className?: string;
}

export default function CoreLink({
  link,
  children,
  className,
}: CoreLinkProps) {
  return (
    <Link
      href={link.href}
      target={link?.openInNewTab ? '_blank' : undefined}
      rel={link?.openInNewTab ? 'noopener noreferrer' : undefined}
      className={className}
    >
      {children}
    </Link>
  );
}
