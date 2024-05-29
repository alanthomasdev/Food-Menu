import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import prettierConfig from "eslint-config-prettier";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  {
    languageOptions: {
      globals: globals.browser,
      sourceType: 'module',
    },
  },
  pluginJs.configs.recommended,
  pluginReactConfig,
  prettierConfig,
  {
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      'prettier/prettier':'off',
      'quotes': 'off', 
      'react/react-in-jsx-scope': 'off',
      'no-unused-vars': 'off',
      "react/no-unknown-property": 'off',
      'react/prop-types':'off',
      'react/jsx-key':'off',
      'no-undef':'off',
    },
  },
];