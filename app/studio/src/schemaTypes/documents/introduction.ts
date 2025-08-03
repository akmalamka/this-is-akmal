import { RiPagesLine } from 'react-icons/ri';
import { defineField, defineType } from 'sanity';

export const introduction = defineType({
  name: 'introduction',
  type: 'document',
  icon: RiPagesLine,
  fields: [
    defineField({
      name: 'name',
      title: 'name',
      description: 'Your name',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'description',
      description: 'Who are you?',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
          description: 'Important for SEO and accessibility.',
          validation: (rule) => {
            // Custom validation to ensure alt text is provided if the image is present. https://www.sanity.io/docs/validation
            return rule.custom((alt, context) => {
              if ((context.document?.image as any)?.asset?._ref && !alt) {
                return 'Required';
              }
              return true;
            });
          },
        }),
      ],
      options: {
        hotspot: true,
        aiAssist: {
          imageDescriptionField: 'alt',
        },
      },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'description',
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle,
      };
    },
  },
});
