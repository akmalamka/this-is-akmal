import type { HTMLAttributes } from 'react';

interface BaseProps {
  children?: React.ReactNode;
  className?: HTMLAttributes<any>['className'];
}

export type CompProps<T = unknown> = BaseProps & T;
