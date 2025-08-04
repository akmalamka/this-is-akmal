'use client';
import type { ElementType } from 'react';
// This component is used to display rotated text in the introduction section of the portfolio.
// It uses a ref to adjust the dimensions of the wrapper based on the text size.

import type { CompProps } from '@/typings/props';
import classNames from 'classnames';

interface CoreRotatedTextProps extends CompProps {
  text: string;
  childrenClassName?: string;
  as?: ElementType;
}

export default function CoreRotatedText({
  text,
  className,
  childrenClassName = 'text-[250px]',
  as: Tag = 'div',
}: CoreRotatedTextProps) {
  return (
    <div className={classNames('flex items-center justify-center h-full', className)}>
      <Tag className={classNames('font-display font-semibold uppercase lg:-rotate-90', childrenClassName)}>
        {text}
      </Tag>
    </div>
  );
}
