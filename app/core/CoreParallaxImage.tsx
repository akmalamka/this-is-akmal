'use client';

import { getImageDimensions } from '@sanity/asset-utils';
import { stegaClean } from '@sanity/client/stega';
import classNames from 'classnames';
import { motion, useScroll, useTransform } from 'motion/react';
import { Image } from 'next-sanity/image';
import { useRef } from 'react';
import { useAppProvider } from '@/context/AppProvider';
import { urlForImage } from '@/sanity/utils';

interface CoverImageProps extends React.HTMLProps<HTMLDivElement> {
  image: any;
  imageType: 'clickable' | 'hoverable' | null;
  priority?: boolean;
  hoverMe?: boolean;
}

export default function CoreParallaxImage(props: CoverImageProps) {
  const {
    image: source,
    imageType,
    priority,
    className,
    hoverMe = false,
    ...rest
  } = props;

  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end start'],
  });
  const { isImageHovered, setIsImageHovered } = useAppProvider();

  function imageHoverHandler() {
    if (hoverMe && !isImageHovered) {
      setIsImageHovered(true);
    }
  }

  const lqip = source?.asset?.metadata?.lqip;

  // TODO: check why in mobile when scroll, the image zoom a little bit
  const y = useTransform(scrollYProgress, [0, 1], ['0vh', '10vh']);

  return source?.asset?._ref
    ? (
        <div
          className={classNames(
            'overflow-hidden relative',
            className,
            {
              'img-clickable': imageType === 'clickable',
              'img-hoverable': imageType === 'hoverable',
            },
          )}
          ref={container}
          {...rest}
        >
          <div
            className={classNames('w-full h-full bg-black/10 absolute inset-0 z-10 animate-pulse flex justify-center items-center font-mono uppercase lg:text-[40px]', {
              block: hoverMe,
              hidden: !hoverMe,
            })}
            onMouseEnter={imageHoverHandler}
          >
            hover me
          </div>
          <motion.div style={{ y }} className="relative h-full noise-bg">
            <Image
              className="object-cover object-center h-full"
              width={getImageDimensions(source).width}
              height={getImageDimensions(source).height}
              alt={stegaClean(source?.alt) || ''}
              src={urlForImage(source)?.url() as string}
              loading={priority ? 'eager' : 'lazy'}
              placeholder={lqip || undefined}
              priority={priority}
            />
          </motion.div>
        </div>
      )
    : null;
}
