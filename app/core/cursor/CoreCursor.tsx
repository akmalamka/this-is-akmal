'use client';

import classNames from 'classnames';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';
import { useCtaText } from '@/context/CtaTextContext';
import CoreRotatingTextCursor from './CoreRotatingTextCursor';

export default function CoreCursor() {
  const { ctaText } = useCtaText();
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const followerX = useSpring(cursorX, { damping: 20, stiffness: 150 });
  const followerY = useSpring(cursorY, { damping: 20, stiffness: 150 });

  const [isClickable, setIsClickable] = useState(false);
  const [isImgClickable, setIsImgClickable] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;

      // Mark anything clickable by tag or data attribute
      const isClickTarget
          = target.closest('a, button, [role="button"], [data-cursor-clickable]');

      const isImageClickable = target.closest('.img-clickable');
      setIsImgClickable(Boolean(isImageClickable));

      setIsClickable(Boolean(isClickTarget));
    };

    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="max-lg:hidden !z-999 pointer-events-none fixed inset-0">
      {/* Follower */}
      {isImgClickable
        ? (
            <motion.div
              style={{
                x: followerX,
                y: followerY,
                translateX: '-50%',
                translateY: '-50%',
              }}
              className="w-64 h-64 relative"
            >
              <CoreRotatingTextCursor text={ctaText} />
            </motion.div>
          )
        : (
            <>
              <motion.div
                className={classNames([
                  'w-[50px] h-[50px] rounded-full border-2 mix-blend-difference fixed top-0 left-0',
                  isClickable ? 'border-primary' : 'border-white',
                ])}
                style={{
                  x: followerX,
                  y: followerY,
                  translateX: '-50%',
                  translateY: '-50%',
                  scale: isClickable ? 1.2 : 1,
                }}
              />
              {/* Actual cursor dot */}
              <motion.div
                className={classNames([
                  'w-[10px] h-[10px] rounded-full mix-blend-difference fixed top-0 left-0',
                  isClickable ? 'bg-primary' : 'bg-white',
                ])}
                style={{
                  x: cursorX,
                  y: cursorY,
                  translateX: '-50%',
                  translateY: '-50%',
                  scale: isClickable ? 1.2 : 1,
                }}
              />
            </>
          )}
    </div>
  );
}
