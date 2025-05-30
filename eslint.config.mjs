import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default (async () => {
  const tsPlugin = await import('@typescript-eslint/eslint-plugin');
  const tsParser = await import('@typescript-eslint/parser');
  const prettierPlugin = await import('eslint-plugin-prettier');

  return [
    ...compat.extends(
      'next/core-web-vitals',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended'
    ),
    {
      files: ['src/**/*.{ts,tsx}'], // 🔧 тільки папка src
      languageOptions: {
        parser: tsParser.default,
        parserOptions: {
          project: './tsconfig.json',
          tsconfigRootDir: __dirname,
          sourceType: 'module',
        },
      },
      plugins: {
        '@typescript-eslint': tsPlugin.default,
        prettier: prettierPlugin.default,
      },
      rules: {
        '@typescript-eslint/interface-name-prefix': 'off',
        '@typescript-eslint/explicit-function-return-type': 'error',
        '@typescript-eslint/no-explicit-any': 'off',
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [
          'error',
          {
            argsIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            caughtErrorsIgnorePattern: '^_',
          },
        ],
        quotes: ['error', 'single'],
      },
    },
    {
      ignores: ['.eslintrc.cjs', 'src/components/icons/**'],
    },
  ];
})();
