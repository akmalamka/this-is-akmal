/* eslint-disable ts/no-use-before-define */
'use client';

import type { AllProjectsQueryResult } from '@/sanity.types';
import { AnimatePresence, motion, wrap } from 'motion/react';
import { useState } from 'react';
import CoreImage from '@/app/core/CoreImage';
import CoreRotatedText from '@/app/core/CoreRotatedText';
import CoreArrowCircle from '../core/CoreArrowCircle';

export default function Projects({ projects }: { projects: AllProjectsQueryResult }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  function setSlide(newDirection: 1 | -1) {
    const nextItem = wrap(0, projects.length, selectedIndex + newDirection);
    setSelectedIndex(nextItem);
    setDirection(newDirection);
  }

  return (
    <div className="text-white grid grid-cols-12 gap-6 items-end">
      <div className="col-span-3 flex flex-col justify-between h-full">
        <div>
          <h2 className="font-mono text-[16px] uppercase ">Projects</h2>
          <h3 className="font-sans text-[16px] max-w-[230px]">
            Something that I am proud to work on, even though it&apos;s not that much
          </h3>
        </div>
        <div className="font-display col-span-2 grid grid-cols-3 gap-4 items-end">
          <span className="text-[130px] leading-[100%] col-span-1">
            {String(selectedIndex + 1).padStart(2, '0')}
          </span>
          <span className="text-[75px] leading-[100%] col-span-1">
            /
            {projects.length}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-6 justify-center items-end col-span-6 relative">
        {projects[selectedIndex]?.image && (
          // TODO: might need to wrap all AnimatedComponent with AnimatePresence
          <AnimatePresence
            custom={direction}
            initial={false}
            mode="popLayout"
          >
            <motion.div
              key={projects[selectedIndex].image.asset?._ref}
              initial={{ opacity: 0, x: direction * 50 }}
              animate={{
                opacity: 1,
                x: 0,
                transition: {
                  delay: 0.2,
                  type: 'spring',
                  visualDuration: 0.3,
                  bounce: 0.4,
                },
              }}
              exit={{ opacity: 0, x: direction * -50 }}
              className="col-span-3"
            >
              <CoreImage image={projects[selectedIndex].image} className="max-w-[300px] h-[70dvh]" priority />
            </motion.div>
          </AnimatePresence>
        )}
        <AnimatePresence
          custom={direction}
          initial={false}
          mode="popLayout"
        >
          <motion.div
            key={projects[selectedIndex].title}
            custom={direction}
            initial="enter"
            animate="center"
            exit="exit"
            variants={textVariants}
            transition={{
              type: 'tween',
              duration: 0.4,
              ease: 'easeInOut',
            }}
            className="col-span-3 h-[70dvh]"
          >
            <CoreRotatedText text={projects[selectedIndex].title || ''} className="col-span-3" childrenClassName="text-[107px]" />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="col-span-3 flex flex-col justify-between h-full items-end">
        <div className="flex gap-2">
          <CoreArrowCircle onClick={() => setSlide(-1)} />
          <CoreArrowCircle className="rotate-180" onClick={() => setSlide(1)} />
        </div>
        <AnimatePresence
          custom={direction}
          initial={false}
          mode="popLayout"
        >
          <motion.div
            key={projects[selectedIndex].client}
            custom={direction}
            initial="enter"
            animate="center"
            exit="exit"
            variants={textVariants}
            transition={{
              type: 'tween',
              duration: 0.4,
              ease: 'easeInOut',
            }}
            className="flex flex-col gap-9 w-full"
          >
            <div>
              <h4 className="font-sans text-[16px] uppercase font-bold">
                Client
              </h4>
              <h5 className="font-sans font-extralight text-[20px]">{projects[selectedIndex].client}</h5>
            </div>
            <div>
              <h4 className="font-sans text-[16px] uppercase font-bold">
                Role
              </h4>
              <h5 className="font-sans font-extralight text-[20px]">{projects[selectedIndex].role}</h5>
            </div>
            <h5 className="font-sans font-semibold text-[16px] uppercase">{projects[selectedIndex].dateDuration}</h5>
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
}

const textVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: '0%',
    opacity: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0,
  }),
};
