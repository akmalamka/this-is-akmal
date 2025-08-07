'use client';

import type { CompProps } from '@/typings/props';

import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import Link from 'next/link';
import { useEffect } from 'react';
import { Drawer } from 'vaul';
import { useIsMobile } from '@/hooks/use-mobile';
import LayoutHamburgerButton from '@/layouts/LayoutHamburgerButton';

interface CoreDrawerProps extends CompProps {
  title?: React.ReactNode;
  trigger: React.ReactNode;
  state: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

export default function CoreDrawer({
  children,
  trigger,
  state,
  title = (
    <Link
      className="text-black text-[20px] font-display uppercase font-semibold"
      href="/"
    >
      This is Akmal
    </Link>
  ),
}: CoreDrawerProps) {
  // TODO: next release, prevent background scroll when drawer is open
  const [isDrawerOpen, setIsDrawerOpen] = state;

  const isMobile = useIsMobile();

  useEffect(() => {
    setIsDrawerOpen(false);
  }, [isMobile]);

  return (
    <Drawer.Root direction="top" open={isDrawerOpen} dismissible={false}>
      {trigger}
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-30" data-lenis-prevent />
        <Drawer.Content className="overflow-y-auto overflow-x-hidden bg-white h-[100dvh] fixed bottom-0 left-0 right-0 outline-none z-30">
          <div className="container">
            <Drawer.Title className="flex items-center justify-between h-[var(--navbar-height)]">
              {title}
              <Drawer.Close>
                <LayoutHamburgerButton
                  isOpen={true}
                  className="bg-black text-white"
                  onClick={() => setIsDrawerOpen(false)}
                />
              </Drawer.Close>
            </Drawer.Title>
            <VisuallyHidden>
              <Drawer.Description />
            </VisuallyHidden>
            <div className="overflow-y-auto h-[calc(100dvh-var(--navbar-height))]">
              {children}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
