import { LinkIcon } from '@sanity/icons';
import { defineType } from 'sanity';

/**
 * Link schema object.
 */

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'url',
  icon: LinkIcon,
});
