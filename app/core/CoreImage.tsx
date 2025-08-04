import type { CompProps } from '@/typings/props';
import { getImageDimensions } from '@sanity/asset-utils';
import { stegaClean } from '@sanity/client/stega';
import classNames from 'classnames';
import { Image } from 'next-sanity/image';
import { urlForImage } from '@/sanity/utils';

interface CoverImageProps extends CompProps {
  image: any;
  priority?: boolean;
}

export default function CoreImage(props: CoverImageProps) {
  const { image: source, priority, className } = props;
  return source?.asset?._ref
    ? (
        <Image
          className={classNames('object-cover object-center', className)}
          width={getImageDimensions(source).width}
          height={getImageDimensions(source).height}
          alt={stegaClean(source?.alt) || ''}
          src={urlForImage(source)?.url() as string}
          priority={priority}
        />
      )
    : null;
}
