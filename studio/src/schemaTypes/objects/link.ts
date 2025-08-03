import { LinkIcon } from '@sanity/icons';
import { defineType } from 'sanity';

/**
 * Link schema object. This link object lets the user first select the type of link and then
 * then enter the URL, page reference, or post reference - depending on the type selected.
 * Learn more: https://www.sanity.io/docs/object-type
 */

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'url',
  icon: LinkIcon,
  validation: (Rule) =>
  // Custom validation to ensure URL is provided if the link type is 'href'
    Rule.custom((value, context: any) => {
      if (context.parent?.withCTA) {
        return true;
      } else if (!value) {
        return 'URL is required';
      }
      return true;
    }),
});
