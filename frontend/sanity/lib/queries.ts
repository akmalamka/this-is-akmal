import { defineQuery } from 'next-sanity';

export const settingsQuery = defineQuery('*[_type == "settings"][0]');
export const introductionQuery = defineQuery('*[_type == "introduction"][0]');

export const allProjectsQuery = defineQuery(`
  *[_type == "project"] | order(_updatedAt desc) {
    _id,
    title,
    fullTitle,
    ctaButton,
    description,
    client,
    role,
    dateDuration,
    image
  }
`);

export const allHobbiesQuery = defineQuery(`
  *[_type == "hobby"] | order(_updatedAt desc) {
    _id,
    title,
    description,
    ctaButton,
    image
  }
`);

export const allSocialsQuery = defineQuery(`
  *[_type == "social"] | order(_updatedAt desc) {
    _id,
    title,
    url
  }
`);
