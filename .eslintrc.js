module.exports = {
  root: true,

  extends: ['@metamask/eslint-config'],

  rules: {
    'import/no-nodejs-modules': 'off',
  },

  parserOptions: {
    sourceType: 'module',
  },

  overrides: [
    {
      files: ['*.ts'],
      extends: ['@metamask/eslint-config-typescript'],
    },

    {
      files: ['*.js'],
      parserOptions: {
        sourceType: 'script',
      },
      extends: ['@metamask/eslint-config-nodejs'],
    },

    {
      files: ['*.test.ts', '*.test.js'],
      extends: ['@metamask/eslint-config-jest'],
    },
  ],

  ignorePatterns: [
    '!.eslintrc.js',
    '!.prettierrc.js',
    'build/',
    'docs/',
    'generated/',
    '.yarn/',
  ],
};
