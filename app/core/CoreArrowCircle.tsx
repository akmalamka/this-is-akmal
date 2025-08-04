import type { CompProps } from '../typings/props';
import classNames from 'classnames';
import { motion } from 'motion/react';

export default function CoreArrowCircle({ className, onClick }: CompProps & React.HTMLProps<HTMLButtonElement>) {
  return (
    <motion.button
      initial={false}
      aria-label="Previous"
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.1 }}
      whileFocus={{ outline: '2px solid white' }}
      className={classNames('w-[52px] h-[52px]', className)}
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" className="w-full">
        <circle cx="26" cy="26" r="25.5" className="stroke-white" />
        <path className="fill-white" d="M16.334 26.173a.75.75 0 0 0 0 1.06l4.773 4.773a.75.75 0 1 0 1.061-1.06l-4.243-4.243 4.243-4.242a.75.75 0 0 0-1.06-1.061l-4.774 4.773Zm21.612.53v-.75H16.865v1.5h21.08v-.75Z" />
      </svg>
    </motion.button>

  );
}
