'use client';

import type { CompProps } from '@/app/typings/props';
import { getImageDimensions } from '@sanity/asset-utils';
import { stegaClean } from '@sanity/client/stega';
import classNames from 'classnames';
import { motion, useScroll, useTransform } from 'motion/react';
import { Image } from 'next-sanity/image';
import { useRef } from 'react';
import { urlForImage } from '@/sanity/lib/utils';

interface CoverImageProps extends CompProps {
  image: any;
  priority?: boolean;
}

export default function CoreParallaxImage(props: CoverImageProps) {
  const { image: source, priority, className } = props;

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end start'],

  });

  const y = useTransform(scrollYProgress, [0, 1], ['0vh', '10vh']);

  return source?.asset?._ref
    ? (
        <div className={classNames('overflow-hidden', className)} ref={container}>
          <motion.div style={{ y }} className="relative h-full">
            <Image
              className="object-cover object-center h-full"
              width={getImageDimensions(source).width}
              height={getImageDimensions(source).height}
              alt={stegaClean(source?.alt) || ''}
              src={urlForImage(source)?.url() as string}
              priority={priority}
            />
          </motion.div>
        </div>
      )
    : null;
}
