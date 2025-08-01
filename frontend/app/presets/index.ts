import type { Preset } from 'unocss';
import type { Theme } from 'unocss/preset-uno';

const TUSKER_STR = 'var(--font-tusker)';
const INTER_STR = 'var(--font-inter)';
const JETBRAINS_MONO_STR = 'var(--font-jetbrains-mono)';

// Find a way to trigger fast refresh when this file is changes
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
        h1: ['200px', { 'font-weight': 600, 'font-family': TUSKER_STR }],
        h2: ['130px', { 'line-height': '120%', 'font-weight': 600, 'font-family': TUSKER_STR }],
        h3: ['107px', { 'font-family': TUSKER_STR }],
        h4: ['81px', { 'font-weight': 500, 'font-family': TUSKER_STR }],
        h5: ['75px', { 'line-height': '120%', 'font-weight': 600, 'font-family': TUSKER_STR }],
        sh1: ['24px', { 'font-family': INTER_STR }],
        sh2: ['20px', { 'font-weight': 200, 'font-family': INTER_STR }],
        sh3: ['18px', { 'font-family': INTER_STR }],
        sh4: ['16px', { 'font-weight': 200, 'font-family': INTER_STR }],
        sh5: ['14px', { 'font-weight': 700, 'font-family': INTER_STR }],
        sh6: ['14px', { 'font-weight': 600, 'font-family': INTER_STR }],
        body: ['20px', { 'font-weight': 600, 'font-family': TUSKER_STR }],
        navigation: ['16px', { 'font-weight': 300, 'font-family': JETBRAINS_MONO_STR }],
        links: ['16px', { 'font-weight': 500, 'font-family': INTER_STR }],
        label: ['16px', { 'font-family': JETBRAINS_MONO_STR }],
        caption: ['14px', { 'font-family': JETBRAINS_MONO_STR }],
      },

      zIndex: {
        background: '-10',
        base: '0',
        content: '10',
        header: '20',
        dialog: '30',
      },

      colors: {
        primary: {
          DEFAULT: '#eb110A',
        },
        white: '#FFFFFF',
        black: '#0b0b0b',
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
