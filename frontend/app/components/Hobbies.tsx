'use client';

import type { AllHobbiesQueryResult } from '@/sanity.types';
import { motion } from 'motion/react';
import CoreImage from '@/app/core/CoreImage';
import CoreAnimatePresent from '../animation/CoreAnimatePresent';
import { useCarousel } from '../composables/useCarousel';
import CoreArrowCircle from '../core/CoreArrowCircle';

export default function Hobbies({ hobbies }: { hobbies: AllHobbiesQueryResult }) {
  const { selectedIndex, direction, setSlide } = useCarousel(hobbies.length);

  return (
    <div className="flex flex-col gap-6 text-white ">
      <div className="grid grid-cols-12 gap-6 items-end">
        <div className="col-span-3 flex flex-col justify-between h-full">
          <div>
            <h2 className="font-mono text-[16px] uppercase ">Hobbies</h2>
            <h3 className="font-sans font-extralight text-[16px] max-w-[230px]">
              Something that I longed for after a loong working day
            </h3>
          </div>
          <CoreAnimatePresent>
            <motion.h4
              key={hobbies[selectedIndex]._id}
              initial={{ opacity: 0, y: direction * 50 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.2,
                  type: 'spring',
                  visualDuration: 0.3,
                  bounce: 0.4,
                },
              }}
              exit={{ opacity: 0, y: direction * -50 }}
              className="font-sans font-extralight text-[16px] max-w-[230px]"
            >
              {hobbies[selectedIndex].description}
            </motion.h4>
          </CoreAnimatePresent>
        </div>
        <div className="col-span-9">
          {hobbies[selectedIndex]?.image && (
            <CoreAnimatePresent>
              <motion.div
                key={hobbies[selectedIndex]._id}
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
                className="col-span-3 w-full"
              >
                {/* TODO: add image filter mirip di ftrprf */}
                <CoreImage image={hobbies[selectedIndex].image} className="h-[65dvh]" priority />
              </motion.div>
            </CoreAnimatePresent>
          )}
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-9 col-start-4 flex justify-between">
          <CoreAnimatePresent>
            <motion.h3
              key={hobbies[selectedIndex]._id}
              initial={{ opacity: 0, y: direction * 50 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: 0.2,
                  type: 'spring',
                  visualDuration: 0.3,
                  bounce: 0.4,
                },
              }}
              exit={{ opacity: 0, y: direction * -50 }}
              className="font-display text-[81px] font-medium"
            >
              {hobbies[selectedIndex].title}
            </motion.h3>
          </CoreAnimatePresent>
          <div className="flex gap-2">
            <CoreArrowCircle onClick={() => setSlide(-1)} />
            <CoreArrowCircle className="rotate-180" onClick={() => setSlide(1)} />
          </div>
        </div>
      </div>
    </div>
  );
}
