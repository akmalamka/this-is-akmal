import React from 'react';

import Cta from '@/app/components/Cta';
import Info from '@/app/components/InfoSection';
import { dataAttr } from '@/sanity/lib/utils';

interface BlocksType {
  [key: string]: React.FC<any>;
}

interface BlockType {
  _type: string;
  _key: string;
}

interface BlockProps {
  index: number;
  block: BlockType;
  pageId: string;
  pageType: string;
}

const Blocks: BlocksType = {
  callToAction: Cta,
  infoSection: Info,
};

/**
 * Used by the <PageBuilder>, this component renders a the component that matches the block type.
 */
export default function BlockRenderer({
  block,
  index,
  pageId,
  pageType,
}: BlockProps) {
  // Block does exist
  if (typeof Blocks[block._type] !== 'undefined') {
    return (
      <div
        key={block._key}
        data-sanity={dataAttr({
          id: pageId,
          type: pageType,
          path: `pageBuilder[_key=="${block._key}"]`,
        }).toString()}
      >
        {React.createElement(Blocks[block._type], {
          key: block._key,
          block,
          index,
        })}
      </div>
    );
  }
  // Block doesn't exist yet
  return React.createElement(
    () => (
      <div className="w-full bg-gray-100 text-center text-gray-500 p-20 rounded">
        A &ldquo;
        {block._type}
        &rdquo; block hasn&apos;t been created
      </div>
    ),
    { key: block._key },
  );
}
