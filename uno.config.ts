import { presetVinicunca } from '@vinicunca/unocss-preset-vinicunca';
import {
  defineConfig,
  presetTypography,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';
import { presetCore } from './frontend/app/presets';

export default defineConfig({
  configDeps: ['app/presets/index.ts'],

  layers: {
    fonts: -20,
    preflights: -10,
  },

  presets: [
    presetVinicunca({
      fluidOptions: {
        minWidth: 360,
      },
      icons: {
        extraProperties: {
          'display': 'inline-block',
          'vertical-align': 'middle',
        },
        scale: 1.25,
        warn: true,
      },
    }),
    presetWind3(),
    presetCore(),
    presetTypography(),
  ],

  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
});
