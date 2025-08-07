import Link from 'next/link';

interface ResolvedLinkProps {
  link: any;
  children: React.ReactNode;
  className?: string;
}

export default function ResolvedLink({
  link,
  children,
  className,
  ...props
}: ResolvedLinkProps & React.HTMLProps<HTMLAnchorElement>) {
  const resolvedLink = link ?? null;

  if (typeof resolvedLink === 'string') {
    return (
      <Link
        href={resolvedLink}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        {...props}
      >
        {children}
      </Link>
    );
  }
  return <>{children}</>;
}
