import { defineQuery } from 'next-sanity';

const IMAGE_TYPE_QUERY = `
  "imageType": select(
    withCTA == false => null,
    withCTA == true && defined(ctaButton.link) => "clickable",
    withCTA == true && !defined(ctaButton.link) => "hoverable"
  )
`;
const IMAGE_ASSET_QUERY = `
  image {
    ...,
    "lqip": asset->metadata.lqip,
  }
`;
export const settingsQuery = defineQuery('*[_type == "settings"][0]');
export const introductionQuery = defineQuery('*[_type == "introduction"][0]');

export const allProjectsQuery = defineQuery(`
  *[_type == "project"] | order(_updatedAt desc) {
    _id,
    title,
    fullTitle,
    withCTA,
    ctaButton,
    description,
    client,
    role,
    dateDuration,
    ${IMAGE_TYPE_QUERY},
    ${IMAGE_ASSET_QUERY}
  }
`);

export const allHobbiesQuery = defineQuery(`
  *[_type == "hobby"] | order(_updatedAt desc) {
    _id,
    title,
    description,
    ctaButton,
    ${IMAGE_TYPE_QUERY},
    ${IMAGE_ASSET_QUERY}
  }
`);

export const allSocialsQuery = defineQuery(`
  *[_type == "social"] | order(_updatedAt desc) {
    _id,
    title,
    url
  }
`);
