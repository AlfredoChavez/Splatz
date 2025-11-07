import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import stylistic from '@stylistic/eslint-plugin'

export default [
  { ignores: ['dist'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      '@stylistic': stylistic,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      '@stylistic/semi': ['error', 'always'],
      '@stylistic/quotes': ['error', 'single'],
      '@stylistic/indent': ['error', 2],
      '@stylistic/comma-dangle': ['error', 'always-multiline'],
      '@stylistic/no-trailing-spaces': 'error',
      '@stylistic/no-multiple-empty-lines': ['error', { max: 1 }],

      '@stylistic/no-multi-spaces': 'error',
      '@stylistic/no-extra-semi': 'error',
      '@stylistic/no-whitespace-before-property': 'error',
      '@stylistic/space-in-parens': ['error', 'never'],
      '@stylistic/space-before-blocks': ['error', 'always'],
      '@stylistic/space-before-function-paren': [
        'error',
        { anonymous: 'always', named: 'never', asyncArrow: 'always' },
      ],
      '@stylistic/space-infix-ops': 'error',
    },
  },
]