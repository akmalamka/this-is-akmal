'use client';

import type { AllHobbiesQueryResult } from '@/studio/sanity.types';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Drawer } from 'vaul';
import CoreAnimatePresent from '@/animations/CoreAnimatePresent';
import { useCarousel } from '@/composables/useCarousel';
import { useAppProvider } from '@/context/AppProvider';
import CoreArrowCircle from '@/core/CoreArrowCircle';
import CoreDrawer from '@/core/CoreDrawer';
import CoreImage from '@/core/CoreImage';
import CoreParallaxImage from '@/core/CoreParallaxImage';
import ResolvedLink from './ResolvedLink';

export default function Hobbies({ hobbies }: { hobbies: AllHobbiesQueryResult }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { ctaProps, setCtaProps, isImageHovered } = useAppProvider();
  const { selectedIndex, direction, setSlide } = useCarousel(hobbies.length);
  const [selectedHobby, setSelectedHobby] = useState(hobbies[selectedIndex]);

  useEffect(() => {
    setSelectedHobby(hobbies[selectedIndex]);
  }, [selectedIndex]);

  // TODO: convert this into custom hook
  function hoverImageHandler() {
    if (selectedHobby.ctaButton) {
      let className;
      if (selectedHobby.imageType === 'clickable') {
        className = 'fill-primary';
      } else if (selectedHobby.imageType === 'hoverable') {
        className = 'fill-secondary';
      }
      setCtaProps({ ...ctaProps, text: selectedHobby.ctaButton.text, className });
    }
  }

  return (
    <section className="grid grid-cols-6 lg:grid-cols-12 gap-6 text-white scroll-m-24" id="hobbies">
      <div className="col-span-6 lg:col-span-3 flex flex-col justify-between h-full">
        <div>
          <h2 className="font-mono text-[16px] uppercase">Hobbies</h2>
          <h3 className="font-sans text-[16px] font-extralight max-w-[230px] hidden lg:block">
            My favorite way to unwind after a packed schedule.
          </h3>
        </div>
        <CoreAnimatePresent>
          <motion.h4
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
              className="col-span-3 w-full"
            >
              <ResolvedLink link={selectedHobby.ctaButton?.link}>
                <CoreParallaxImage
                  image={selectedHobby.image}
                  imageType={selectedHobby.imageType}
                  className="h-[50dvh] hidden lg:block lg:h-[65dvh]"
                  hoverMe={!isImageHovered}
                  onMouseEnter={hoverImageHandler}
                />
              </ResolvedLink>

              <CoreDrawer
                state={[isDrawerOpen, setIsDrawerOpen]}
                title={<div className="font-display font-semibold text-[32px]">{selectedHobby.title}</div>}
                trigger={(
                  <Drawer.Trigger className="text-white lg:hidden">
                    <CoreParallaxImage
                      image={selectedHobby.image}
                      imageType={selectedHobby.imageType}
                      className="h-[50dvh] lg:h-[70dvh]"
                      onClick={() => setIsDrawerOpen(!isDrawerOpen)}
                    />
                  </Drawer.Trigger>
                )}
              >
                <div className="flex flex-col gap-y-4">
                  <CoreImage image={selectedHobby.image} className="h-[30dvh]" />
                  <h4 className='className="font-sans text-[16px] font-extralight'>
                    {selectedHobby.description}
                  </h4>
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
          className="text-center lg:text-start lg:col-start-4 col-span-6 lg:col-span-7 font-display text-[40px] md:text-[50px] lg:text-[70px] font-medium uppercase"
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
