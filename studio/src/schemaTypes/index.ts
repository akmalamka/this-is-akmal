import { hobby } from './documents/hobby';
import { introduction } from './documents/introduction';
import { project } from './documents/project';
import { link } from './objects/link';
import { settings } from './singletons/settings';

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  // Documents
  introduction,
  project,
  hobby,
  // Objects
  link,
];
