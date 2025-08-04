import type { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';
import classNames from 'classnames';
import './styles.css';

export default function LayoutHamburgerButton({ isOpen, className, ...rest }: { isOpen: boolean } & DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement>) {
  return (
    <div
      className={classNames('relative w-10 h-10 justify-center items-center rounded-full flex', className)}
      {...rest}
    >
      {isOpen
        ? <CloseIcon />
        : <HamburgerIcon />}
    </div>
  );
}

function HamburgerIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 100 100">
      <path d="M 20,30 H 80" className="line" strokeWidth="10" />
      <path d="M 20,50 H 80" className="line" strokeWidth="10" />
      <path d="M 20,70 H 80" className="line" strokeWidth="10" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 100 100">
      <path d="M 30,30 L 70,70" className="line" strokeWidth="10" />
      <path d="M 70,30 L 30,70" className="line" strokeWidth="10" />
    </svg>
  );
}
