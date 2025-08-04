import { RiPagesLine } from 'react-icons/ri';
import { defineField, defineType } from 'sanity';

export const social = defineType({
  name: 'social',
  type: 'document',
  icon: RiPagesLine,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      description: 'Social title',
      type: 'string',
    }),
    defineField({
      name: 'url',
      type: 'link',
      title: 'URL',
      description: 'Your social link URL',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'url.href',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle,
      };
    },
  },
});
