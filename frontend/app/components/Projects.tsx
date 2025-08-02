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
    <section className="text-white grid grid-rows-[auto_50dvh_auto_auto] lg:grid-cols-12 lg:grid-rows-none gap-6 items-end" id="projects">
      <div className="row-span-1 flex lg:row-auto lg:col-span-3 lg:flex-col justify-between h-full">
        <div>
          <h2 className="font-mono text-[16px] uppercase">Projects</h2>
          <h3 className="hidden lg:block font-sans font-extralight text-[16px] max-w-[230px]">
            Something that I am proud to work on, even though it&apos;s not that much
          </h3>
        </div>

        <div className="font-display items-end">
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
              className="text-[50px] md:text-[70px] lg:text-[100px] font-semibold line-height-[120%] col-span-1"
            >
              {String(selectedIndex + 1).padStart(2, '0')}
            </motion.span>
          </CoreAnimatePresent>
          <span className="text-[30px] md:text-[50px] lg:text-[75px] font-semibold line-height-[120%] col-span-1">
            /
            {projects.length}
          </span>
        </div>
      </div>
      <div className="grid lg:row-auto lg:grid-cols-6 row-span-2 lg:col-span-6 justify-center items-end gap-6">
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
              className="lg:col-span-3"
            >
              <ResolvedLink link={selectedProject.ctaButton?.link} className="img-clickable">
                <CoreParallaxImage image={selectedProject.image} className="h-[50dvh] lg:h-[70dvh]" priority />
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
            className="lg:col-span-3 lg:h-[70dvh]"
          >
            {/* TODO: add masking to text in less than lg screen */}
            <CoreRotatedText text={selectedProject.title || ''} className="" childrenClassName="text-[50px] md:text-[70px] lg:text-[108px]" />
          </motion.div>
        </CoreAnimatePresent>
      </div>

      <div className="flex row-span-1 lg:row-auto lg:col-span-3 flex-col justify-between h-full items-center lg:items-end">
        <div className="flex gap-8 lg:gap-2">
          <CoreArrowCircle onClick={() => setSlide(-1)} />
          <CoreArrowCircle className="rotate-180" onClick={() => setSlide(1)} />
        </div>

        <div className="hidden lg:flex flex-col gap-9 w-full">
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
                className="font-sans text-[16px] font-extralight"
              >
                {selectedProject.description}
              </motion.h3>
            </CoreAnimatePresent>
          </div>
          <div>
            <h4 className="font-sans text-[14px] font-bold uppercase">
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
                className="font-sans text-[20px] font-extralight"
              >
                {selectedProject.client}
              </motion.h5>
            </CoreAnimatePresent>
          </div>
          <div>
            <h4 className="font-sans text-[14px] font-bold uppercase">
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
                className="font-sans text-[20px] font-extralight"
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
              className="font-sans text-[14px] font-semibold uppercase"
            >
              {selectedProject.dateDuration}
            </motion.h5>
          </CoreAnimatePresent>
        </div>
      </div>
    </section>
  );
}
