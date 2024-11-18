// eslint.config.mjs
import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import pluginNext from "eslint-plugin-next";
import babelParser from "@babel/eslint-parser";

export default [
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      parser: babelParser,
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  pluginJs.configs.recommended,
  pluginReact.configs.flat.recommended,
  pluginNext.configs.recommended, // Ensure the Next.js plugin is included
];
