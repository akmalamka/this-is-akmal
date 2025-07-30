'use client';

import { motion } from 'motion/react';

const MotionDiv = motion.div;

export default function RunningText() {
  const content = Array(10).fill('Currently available for freelance work, let\'s talk.');

  return (
    <div className="relative w-screen overflow-hidden whitespace-nowrap my-2 py-2 border-y-2 border-white text-white">
      <MotionDiv
        animate={{ x: ['0%', '-50%'] }}
        transition={{
          repeat: Infinity,
          duration: 60,
          ease: 'linear',
        }}
        className="flex w-max"
      >
        {content.map((text, index) => (
          <span key={index} className="mx-1 font-sans text-[16px] font-light shrink-0">
            {text}
          </span>
        ))}
        {content.map((text, index) => (
          <span key={`repeat-${index}`} className="mx-1 font-sans text-[16px] font-light shrink-0">
            {text}
          </span>
        ))}
      </MotionDiv>
    </div>
  );
}
