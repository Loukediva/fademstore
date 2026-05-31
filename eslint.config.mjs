import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  // Import des configurations recommandées par Next.js
  ...nextVitals,
  ...nextTs,

  // Configuration personnalisée pour vos futurs fichiers
  {
    rules: {
      // Autoriser les noms de variables en camelCase
      "@typescript-eslint/no-unused-vars": "warn",
      // Assouplir les règles d'images si vous utilisez beaucoup de sources externes
      "@next/next/no-img-element": "off", 
    },
  },

  // Ignorer les fichiers de build
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "node_modules/**",
  ]),
]);

export default eslintConfig;