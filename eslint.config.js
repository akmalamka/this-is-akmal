const { vinicuncaESLint } = require('@vinicunca/eslint-config');

module.exports = vinicuncaESLint({
  options: {
    react: true,
    nextjs: true,

    typescript: {
      tsconfigPath: ['tsconfig.eslint.json'],
    },
  },

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
    {
      files: ['**/sanity.entity.ts'],
      rules: {
        'ts/consistent-type-definitions': 'off',
        'ts/no-use-before-define': 'off',
        'sonar/redundant-type-aliases': 'off',
      },
    },
  ],
});
