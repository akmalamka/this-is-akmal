import { LinkIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

/**
 * Link schema object. This link object lets the user first select the type of link and then
 * then enter the URL, page reference, or post reference - depending on the type selected.
 * Learn more: https://www.sanity.io/docs/object-type
 */

export const link = defineType({
  name: 'link',
  title: 'Link',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'href',
      title: 'URL',
      type: 'url',
      validation: (Rule) =>
        // Custom validation to ensure URL is provided if the link type is 'href'
        Rule.custom((value) => {
          if (!value) {
            return 'URL is required when Link Type is URL';
          }
          return true;
        }),
    }),
    defineField({
      name: 'openInNewTab',
      title: 'Open in new tab',
      type: 'boolean',
      initialValue: false,
    }),
  ],
});
