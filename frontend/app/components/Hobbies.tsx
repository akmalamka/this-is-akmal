'use client';

import type { AllHobbiesQueryResult } from '@/sanity.types';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Drawer } from 'vaul';
import CoreAnimatePresent from '../animations/CoreAnimatePresent';
import { useCarousel } from '../composables/useCarousel';
import { useCtaText } from '../context/CtaTextContext';
import CoreArrowCircle from '../core/CoreArrowCircle';
import CoreDrawer from '../core/CoreDrawer';
import CoreImage from '../core/CoreImage';
import CoreParallaxImage from '../core/CoreParallaxImage';
import ResolvedLink from './ResolvedLink';

export default function Hobbies({ hobbies }: { hobbies: AllHobbiesQueryResult }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { setCtaText } = useCtaText();
  const { selectedIndex, direction, setSlide } = useCarousel(hobbies.length);
  const [selectedHobby, setSelectedHobby] = useState(hobbies[selectedIndex]);

  useEffect(() => {
    setSelectedHobby(hobbies[selectedIndex]);
    if (hobbies[selectedIndex].ctaButton?.text) {
      setCtaText(hobbies[selectedIndex].ctaButton.text);
    }
  }, [selectedIndex]);

  return (
    <section className="grid grid-cols-6 lg:grid-cols-12 gap-6 text-white scroll-m-24" id="hobbies">
      <div className="col-span-6 lg:col-span-3 flex flex-col justify-between h-full">
        <div>
          <h2 className="font-mono text-[16px] uppercase">Hobbies</h2>
          <h3 className="font-sans text-[16px] font-extralight max-w-[230px] hidden lg:block">
            Something that I longed for after a loong working day
          </h3>
        </div>
        <CoreAnimatePresent>
          <motion.h4
            key={selectedHobby._id}
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
            className="font-sans text-[16px] font-extralight max-w-[230px] hidden lg:block"
          >
            {selectedHobby.description}
          </motion.h4>
        </CoreAnimatePresent>
      </div>
      <div className="col-span-6 lg:col-span-9">
        {selectedHobby?.image && (
          <CoreAnimatePresent>
            <motion.div
              key={selectedHobby._id}
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
              {/* TODO: add image noise effect. Priority: low */}
              <ResolvedLink link={selectedHobby.ctaButton?.link} className="img-clickable">
                <CoreParallaxImage image={selectedHobby.image} className="h-[50dvh] hidden lg:block lg:h-[65dvh]" priority />
              </ResolvedLink>

              <CoreDrawer
                state={[isDrawerOpen, setIsDrawerOpen]}
                title={<div className="font-display font-semibold text-[32px]">{selectedHobby.title}</div>}
                trigger={(
                  <Drawer.Trigger className="text-white lg:hidden">
                    <CoreParallaxImage image={selectedHobby.image} className="h-[50dvh] lg:h-[70dvh]" priority onClick={() => setIsDrawerOpen(!isDrawerOpen)} />
                  </Drawer.Trigger>
                )}
              >
                <div className="flex flex-col gap-y-4">
                  <CoreImage image={selectedHobby.image} className="h-[30dvh]" priority />
                  <h4 className='className="font-sans text-[16px] font-extralight'>
                    {selectedHobby.description}
                  </h4>
                  {String(selectedHobby.ctaButton?.link)}
                  {selectedHobby.ctaButton?.link
                    ? (
                        <ResolvedLink link={selectedHobby.ctaButton?.link} className="self-end">
                          <CoreArrowCircle className="rotate-135 w-[100px] h-[100px]" />
                        </ResolvedLink>
                      )
                    : null}
                </div>
              </CoreDrawer>
            </motion.div>
          </CoreAnimatePresent>
        )}
      </div>
      <CoreAnimatePresent>
        <motion.h3
          key={selectedHobby._id}
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
          className="text-center lg:text-start lg:col-start-4 col-span-6 lg:col-span-7 font-display text-[40px] md:text-[60px] lg:text-[81px] font-medium"
        >
          {selectedHobby.title}
        </motion.h3>
      </CoreAnimatePresent>
      <div className="col-span-6 lg:col-span-2 flex gap-6 justify-center lg:justify-end lg:gap-2">
        <CoreArrowCircle onClick={() => setSlide(-1)} />
        <CoreArrowCircle className="rotate-180" onClick={() => setSlide(1)} />
      </div>
    </section>
  );
}
