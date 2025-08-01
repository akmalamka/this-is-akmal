'use client';
import type { CompProps } from '@/app/typings/props';
// This component is used to display rotated text in the introduction section of the portfolio.
// It uses a ref to adjust the dimensions of the wrapper based on the text size.

import classNames from 'classnames';
import { useLayoutEffect, useRef } from 'react';
// TODO: make sure layout effect happen before rendering so that no layout shift occurs
interface CoreRotatedTextProps extends CompProps {
  text: string;
  childrenClassName?: string;
}

export default function CoreRotatedText({ text, className, childrenClassName = 'text-[250px]' }: CoreRotatedTextProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (textRef.current && wrapperRef.current) {
      const rect = textRef.current.getBoundingClientRect();
      wrapperRef.current.style.width = `${rect.width}px`;
      wrapperRef.current.style.height = `${rect.height}px`;
    }
  }, []);
  return (
    <div className={classNames('flex items-center justify-center', className)} ref={wrapperRef}>
      {/* TODO: change so that h1 can only be the name */}
      <h1 className={classNames('uppercase -rotate-90', childrenClassName)} ref={textRef}>
        {text}
      </h1>
    </div>
  );
}
