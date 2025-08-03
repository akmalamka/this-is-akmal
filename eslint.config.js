const { vinicuncaESLint } = require('@vinicunca/eslint-config');

module.exports = vinicuncaESLint({
  options: {
    react: true,
    nextjs: true,
    extends: [
      'plugin:@next/next/recommended',
    ],

    typescript: {
      tsconfigPath: ['tsconfig.eslint.json'],
    },
  },
  // TODO: don't ignore the sanity types, just turn off the rules that give warn or error
  ignores: ['**/sanity.types.ts'],

  userConfigs: [
    {
      rules: {
        'ts/restrict-plus-operands': 'off',
        'vinicunca/cognitive-complexity': 'off',
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        'ts/no-use-before-define': 'off',
      },
    },
  ],
});
