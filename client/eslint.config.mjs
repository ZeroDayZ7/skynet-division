import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...compat.config({
    extends: ['next'],
    rules: {
      'eslint-disable-next-line': 'off', // Ta linia jest zbędna w 'rules'
      'react-hooks/exhaustive-deps': 'off',
      '@typescript-eslint/no-explicit-any': 'off', // Wyłącza błąd związany z 'any'
      'prefer-const': 'off', // Wyłącza błąd związany z 'const'
      'prefer-null': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'react/no-unescaped-entities': 'off',
      'jsx-a11y/aria-props': 'off',
      'react/react-in-jsx-scope': 'off', // Nie jest potrzebne w Next.js
    }
  })
];



export default eslintConfig;
