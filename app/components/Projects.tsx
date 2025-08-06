'use client';

import type { Direction } from '@/composables/useCarousel';
import type { AllProjectsQueryResult } from '@/studio/sanity.types';
import type { CompProps } from '@/typings/props';
import classNames from 'classnames';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { Drawer } from 'vaul';
import CoreAnimatePresent from '@/animations/CoreAnimatePresent';
import { useCarousel } from '@/composables/useCarousel';
import { useCtaText } from '@/context/AppProvider';
import CoreArrowCircle from '@/core/CoreArrowCircle';
import CoreDrawer from '@/core/CoreDrawer';
import CoreImage from '@/core/CoreImage';
import CoreParallaxImage from '@/core/CoreParallaxImage';
import CoreRotatedText from '@/core/CoreRotatedText';
import ResolvedLink from './ResolvedLink';

export default function Projects({ projects }: { projects: AllProjectsQueryResult }) {
  const { setCtaText } = useCtaText();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { selectedIndex, direction, setSlide } = useCarousel(projects.length);
  const [selectedProject, setSelectedProject] = useState(projects[selectedIndex]);

  useEffect(() => {
    setSelectedProject(projects[selectedIndex]);
    if (projects[selectedIndex].ctaButton?.text) {
      setCtaText(projects[selectedIndex].ctaButton.text);
    }
  }, [selectedIndex]);

  return (
    <section className="text-white grid grid-cols-6 lg:grid-cols-12 gap-6 items-end scroll-m-24" id="projects">
      <div className="flex col-span-6 lg:col-span-3 lg:flex-col justify-between h-full">
        <div>
          <h2 className="font-mono text-[16px] uppercase">Projects</h2>
          <h3 className="hidden lg:block font-sans font-extralight text-[16px] max-w-[230px]">
            Something I really enjoyed working on and feel proud of.
          </h3>
        </div>

        <div className="font-display leading-[100%]">
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
              className="text-[50px] md:text-[70px] lg:text-[100px] font-semibold col-span-1"
            >
              {String(selectedIndex + 1).padStart(2, '0')}
            </motion.span>
          </CoreAnimatePresent>
          <span className="text-[20px] md:text-[30px] lg:text-[50px] font-medium col-span-1">
            /
            {projects.length}
          </span>
        </div>
      </div>
      <div className="grid col-span-6 lg:grid-cols-6 justify-center items-end gap-6">
        {selectedProject?.image && (
          <CoreAnimatePresent>
            <motion.div
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
              className="col-span-6 lg:col-span-3"
            >
              <ResolvedLink link={selectedProject.ctaButton?.link} className="img-clickable">
                <CoreParallaxImage image={selectedProject.image} className="h-[40dvh] hidden lg:block lg:h-[70dvh]" priority />
              </ResolvedLink>

              <CoreDrawer
                state={[isDrawerOpen, setIsDrawerOpen]}
                title={<div className="font-display font-semibold text-[32px]">{selectedProject.title}</div>}
                trigger={(
                  <Drawer.Trigger className="text-white lg:hidden">
                    <CoreParallaxImage image={selectedProject.image} className="h-[40dvh] lg:h-[70dvh]" priority onClick={() => setIsDrawerOpen(!isDrawerOpen)} />
                  </Drawer.Trigger>
                )}
              >
                <div className="flex flex-col gap-y-4">
                  <CoreImage image={selectedProject.image} className="h-[30dvh]" priority />
                  <ProjectDetail direction={direction} selectedProject={selectedProject} />
                  {selectedProject.ctaButton?.link
                    ? (
                        <ResolvedLink link={selectedProject.ctaButton?.link} className="self-end">
                          <CoreArrowCircle className="rotate-135 w-[100px] h-[100px]" />
                        </ResolvedLink>
                      )
                    : null}
                </div>
              </CoreDrawer>
            </motion.div>
          </CoreAnimatePresent>
        )}
        <CoreAnimatePresent>
          <motion.div
            key={selectedProject._id}
            custom={direction}
            initial={{ opacity: 0, y: direction * 50 }}
            exit={{ opacity: 0, y: direction * -50 }}
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
            className="col-span-6 lg:col-span-3 lg:h-[70dvh]"
          >
            <CoreRotatedText as="h3" text={selectedProject.title || ''} className="" childrenClassName="text-[40px] md:text-[60px] lg:text-[108px]" />
            <h4 className="font-sans text-center text-[20px] font-extralight lg:hidden">
              {selectedProject.fullTitle}
            </h4>
          </motion.div>
        </CoreAnimatePresent>
      </div>
      {/* TODO: add scrollable container in drawer */}
      <div className="flex col-span-6 lg:col-span-3 flex-col justify-between h-full items-center lg:items-end">
        <ProjectDetail direction={direction} selectedProject={selectedProject} className="hidden lg:flex" />
        <div className="flex gap-6 lg:gap-2">
          <CoreArrowCircle onClick={() => setSlide(-1)} />
          <CoreArrowCircle className="rotate-180" onClick={() => setSlide(1)} />
        </div>
      </div>
    </section>
  );
}

interface ProjectDetailProps extends CompProps {
  selectedProject: AllProjectsQueryResult[number];
  direction: Direction;
}

function ProjectDetail({
  selectedProject,
  direction,
  className,
}: ProjectDetailProps) {
  return (
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
        className={classNames('flex flex-col gap-9 w-full', className)}
      >
        <h4 className="font-sans text-[20px] font-medium">
          {selectedProject.fullTitle}
        </h4>
        <div>
          <h3
            className="font-sans text-[16px] font-extralight"
          >
            {selectedProject.description}
          </h3>
        </div>
        <div>
          <h4 className="font-sans text-[14px] font-bold uppercase">
            Client
          </h4>
          <h5
            className="font-sans text-[16px] font-extralight"
          >
            {selectedProject.client}
          </h5>
        </div>
        <div>
          <h4 className="font-sans text-[14px] font-bold uppercase">
            Role
          </h4>
          <h5
            className="font-sans text-[16px] font-extralight"
          >
            {selectedProject.role}
          </h5>

        </div>
        <h5
          className="font-sans text-[14px] font-semibold uppercase"
        >
          {selectedProject.dateDuration}
        </h5>
      </motion.div>
    </CoreAnimatePresent>
  );
}
