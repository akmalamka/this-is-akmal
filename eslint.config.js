const { vinicuncaESLint } = require('@vinicunca/eslint-config');

module.exports = vinicuncaESLint({
  options: {
    react: true,
    nextjs: true,

    typescript: {
      tsconfigPath: ['tsconfig.eslint.json'],
    },
  },

  ignores: ['**/sanity.types.ts'],
  // TODO: disable rule not ignore it

  userConfigs: [
    {
      rules: {
        'ts/restrict-plus-operands': 'off',
        'vinicunca/cognitive-complexity': 'off',
      },
    },
  ],
});
