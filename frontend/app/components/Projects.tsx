'use client';

import type { AllProjectsQueryResult } from '@/sanity.types';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import CoreRotatedText from '@/app/core/CoreRotatedText';
// TODO: update all import using @/
import CoreAnimatePresent from '../animations/CoreAnimatePresent';
import { useCarousel } from '../composables/useCarousel';
import { useCtaText } from '../context/CtaTextContext';
import CoreArrowCircle from '../core/CoreArrowCircle';
import CoreParallaxImage from '../core/CoreParallaxImage';
import ResolvedLink from './ResolvedLink';

export default function Projects({ projects }: { projects: AllProjectsQueryResult }) {
  const { setCtaText } = useCtaText();
  const { selectedIndex, direction, setSlide } = useCarousel(projects.length);
  const [selectedProject, setSelectedProject] = useState(projects[selectedIndex]);

  useEffect(() => {
    setSelectedProject(projects[selectedIndex]);
    if (projects[selectedIndex].ctaButton?.text) {
      setCtaText(projects[selectedIndex].ctaButton.text);
    }
  }, [selectedIndex]);
  return (
    // TODO: check why this id only works on projects and not the others
    <section className="text-white grid grid-cols-12 gap-6 items-end scroll-m-24" id="projects">
      <div className="col-span-3 flex flex-col justify-between h-full">
        <div>
          <h2 className="font-mono text-[16px] uppercase ">Projects</h2>
          <h3 className="font-sans font-extralight text-[16px] max-w-[230px]">
            Something that I am proud to work on, even though it&apos;s not that much
          </h3>
        </div>

        <div className="font-display col-span-2 grid grid-cols-3 items-end">
          <CoreAnimatePresent>
            <motion.span
              key={selectedProject._id}
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
              className="text-[130px] leading-[120%] col-span-1"
            >
              {String(selectedIndex + 1).padStart(2, '0')}
            </motion.span>
          </CoreAnimatePresent>
          <span className="text-[75px] leading-[120%] col-span-1">
            /
            {projects.length}
          </span>
        </div>
      </div>
      <div className="grid grid-cols-6 justify-center items-end col-span-6 relative">
        {selectedProject?.image && (
          <CoreAnimatePresent>
            <motion.div
              key={selectedProject._id}
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
              <ResolvedLink link={selectedProject.ctaButton?.link} className="img-clickable">
                <CoreParallaxImage image={selectedProject.image} className="h-[70dvh] " priority />
              </ResolvedLink>
            </motion.div>
          </CoreAnimatePresent>
        )}
        <CoreAnimatePresent>
          <motion.div
            key={selectedProject._id}
            custom={direction}
            initial={{ opacity: 0, x: direction * 50 }}
            exit={{ opacity: 0, x: direction * -50 }}
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
            className="col-span-3 h-[70dvh]"
          >
            <CoreRotatedText text={selectedProject.title || ''} className="col-span-3" childrenClassName="text-[107px]" />
          </motion.div>
        </CoreAnimatePresent>
      </div>

      <div className="col-span-3 flex flex-col justify-between h-full items-end">
        <div className="flex gap-2">
          <CoreArrowCircle onClick={() => setSlide(-1)} />
          <CoreArrowCircle className="rotate-180" onClick={() => setSlide(1)} />
        </div>

        <div className="flex flex-col gap-9 w-full">
          <div>
            <CoreAnimatePresent>
              <motion.h3
                key={selectedProject._id}
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
                className="font-sans font-extralight text-[16px]"
              >
                {selectedProject.description}
              </motion.h3>
            </CoreAnimatePresent>
          </div>
          <div>
            <h4 className="font-sans text-[14px] uppercase font-bold">
              Client
            </h4>
            <CoreAnimatePresent>
              <motion.h5
                key={selectedProject._id}
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
                className="font-sans font-extralight text-[20px]"
              >
                {selectedProject.client}
              </motion.h5>
            </CoreAnimatePresent>
          </div>
          <div>
            <h4 className="font-sans text-[14px] uppercase font-bold">
              Role
            </h4>
            <CoreAnimatePresent>
              <motion.h5
                key={selectedProject._id}
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
                className="font-sans font-extralight text-[20px]"
              >
                {selectedProject.role}
              </motion.h5>
            </CoreAnimatePresent>

          </div>
          <CoreAnimatePresent>
            <motion.h5
              key={selectedProject._id}
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
              className="font-sans font-semibold text-[14px] uppercase"
            >
              {selectedProject.dateDuration}
            </motion.h5>
          </CoreAnimatePresent>
        </div>
      </div>
    </section>
  );
}
