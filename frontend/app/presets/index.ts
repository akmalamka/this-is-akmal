import type { Preset } from 'unocss';
import type { Theme } from 'unocss/preset-uno';

const TUSKER_STR = 'var(--font-tusker)';
const INTER_STR = 'var(--font-inter)';
const JETBRAINS_MONO_STR = 'var(--font-jetbrains-mono)';

export function presetCore(): Preset<Theme> {
  return {
    name: 'preset-core',

    theme: {
      container: {
        center: true,
        padding: '1rem',
      },

      fontFamily: {
        tusker: TUSKER_STR,
        inter: INTER_STR,
        jetbrainsMono: JETBRAINS_MONO_STR,
      },

      fontSize: {
        // TODO: add desktop and mobile fontsize definition
        // Desktop
        h1: ['300px', { 'font-family': TUSKER_STR }],
        caption: ['12px', { 'font-family': JETBRAINS_MONO_STR }],
      },

      zIndex: {
        background: '-10',
        base: '0',
        content: '10',
        header: '20',
        dialog: '30',
      },

      colors: {
        white: '#FFFFFF',
        grey: {
          light: '#F4F4F4',
          medium: '#D9D9D9',
          dark: '#888A8B',
        },
        black: '#000000',
      },
    },

    shortcuts: [
      {
        'wh-full': 'w-full h-full',
      },
      {
        'flex-center': 'flex justify-center items-center',
        'flex-vertical-center': 'flex flex-col justify-center items-center',
        'flex-vertical': 'flex flex-col',
        'flex-y-center': 'flex items-center',
      },
      {
        'offsetted-underline': 'underline underline-offset-3',
      },
    ],
  };
}
