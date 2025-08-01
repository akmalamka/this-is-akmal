'use client';
import type { CompProps } from '@/app/typings/props';
// This component is used to display rotated text in the introduction section of the portfolio.
// It uses a ref to adjust the dimensions of the wrapper based on the text size.

import classNames from 'classnames';

interface CoreRotatedTextProps extends CompProps {
  text: string;
  childrenClassName?: string;
}

export default function CoreRotatedText({ text, className, childrenClassName = 'text-[250px]' }: CoreRotatedTextProps) {
  return (
    <div className={classNames('flex items-center justify-center h-full', className)}>
      {/* TODO: change so that h1 can only be the name */}
      <h1 className={classNames('font-display font-semibold uppercase lg:-rotate-90', childrenClassName)}>
        {text}
      </h1>
    </div>
  );
}
