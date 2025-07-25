/* eslint-disable node/prefer-global/process */
/**
 * This config is used to configure your Sanity Studio.
 * Learn more: https://www.sanity.io/docs/configuration
 */

import { assist } from '@sanity/assist';
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash';

import { media } from 'sanity-plugin-media';
import { structureTool } from 'sanity/structure';
import { schemaTypes } from './src/schemaTypes';
import { structure } from './src/structure';

// Environment variables for project configuration
const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-projectID';
const dataset = process.env.SANITY_STUDIO_DATASET || 'production';

// Main Sanity configuration
export default defineConfig({
  name: 'default',
  title: 'This is Akmal',

  projectId,
  dataset,

  plugins: [
    structureTool({
      structure, // Custom studio structure configuration, imported from ./src/structure.ts
    }),
    // Additional plugins for enhanced functionality
    unsplashImageAsset(),
    assist(),
    visionTool(),
    media(),
  ],

  // Schema configuration, imported from ./src/schemaTypes/index.ts
  schema: {
    types: schemaTypes,
  },
});
