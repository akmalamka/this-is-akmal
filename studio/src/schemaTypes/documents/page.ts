import { slugify } from '@vinicunca/perkakas';
import { RiPagesLine } from 'react-icons/ri';
import { defineField, defineType } from 'sanity';
import { componentMembers } from '../components';
import { isUniqueAcrossAllDocuments } from '../utils/is-unique-sanity';

const seo = [
  defineField({
    name: 'title',
    title: 'Site Title',
    description: 'The title of the site',
    type: 'string',
    group: 'seo',
  }),

  defineField({
    name: 'url',
    title: 'URL',
    type: 'slug',
    group: 'seo',
    validation: (rule) => [
      rule.required(),
      rule.custom((slug) => {
        if (!slug?.current?.startsWith('/')) {
          return 'URL must start with a forward slash';
        }

        return true;
      }),
    ],
    options: {
      source: 'title',
      slugify: (str) => `/${slugify(str)}`,
      isUnique: isUniqueAcrossAllDocuments,
    },
  }),
];

const components = [
  defineField({
    name: 'components',
    type: 'array',
    group: 'components',
    of: componentMembers,
  }),
];

export const page = defineType({
  name: 'pag',
  type: 'document',
  icon: RiPagesLine,
  groups: [
    {
      name: 'components',
    },
    {
      name: 'seo',
      title: 'SEO',
    },
  ],
  fields: [
    ...seo,
    ...components,
  ],
  preview: {
    select: {
      title: 'title',
      path: 'url.current',
    },
    prepare({ title, path }) {
      return {
        title,
        subtitle: path,
      };
    },
  },
});
