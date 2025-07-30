'use client';
import type { CompProps } from '../typings/props';

import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import Link from 'next/link';
import { Drawer } from 'vaul';
import LayoutHamburgerButton from '../layouts/LayoutHamburgerButton';

interface CoreDrawerProps extends CompProps {
  trigger: React.ReactNode;
}

export default function CoreDrawer({ children, trigger }: CoreDrawerProps) {
  return (
    <Drawer.Root direction="top">
      <Drawer.Trigger className="text-white">{trigger}</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-30" />
        <Drawer.Content className="bg-white h-[100dvh] fixed bottom-0 left-0 right-0 outline-none z-30">
          <div className="container h-[100dvh]">
            <Drawer.Title className="flex items-center justify-between h-24">
              <Link className="text-black text-[20px] font-display uppercase font-semibold" href="/">
                This is Akmal
              </Link>
              <Drawer.Close>
                <LayoutHamburgerButton isOpen={true} className="bg-black text-white" />
              </Drawer.Close>
            </Drawer.Title>
            <VisuallyHidden>
              <Drawer.Description />
            </VisuallyHidden>
            {children}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
