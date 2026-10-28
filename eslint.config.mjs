import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypeScript from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';

const eslintConfig = [
  ...nextVitals,
  ...nextTypeScript,
  prettier,
  {
    ignores: ['.next/**', '.open-next/**', '.wrangler/**', 'next-env.d.ts'],
  },
  {
    rules: {
      semi: ['error'],
      'no-unused-vars': 'warn',
      'no-console': 'warn',
      // Keep existing effect patterns non-blocking during the Next.js upgrade.
      'react-hooks/set-state-in-effect': 'warn',
    },
  },
];

export default eslintConfig;
