import js from "@eslint/js";
import nodePlugin from "eslint-plugin-node";

export default [
  js.configs.recommended,
  {
    files: ["**/*.js"],
    ignores: ["node_modules/**", "dist/**", "build/**", "coverage/**"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        process: "readonly",
        __dirname: "readonly",
        __filename: "readonly",
        require: "readonly", // If you use CommonJS
        module: "readonly",
        exports: "readonly",
        Buffer: "readonly",
        setImmediate: "readonly",
        clearImmediate: "readonly",
      },
    },
    plugins: {
      node: nodePlugin,
    },
    rules: {
      // General JavaScript rules
      semi: ["error", "always"],
      quotes: ["error", "single"],
      indent: ["error", 2],
      "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "no-console": "off", // Allow console in backend
      "no-var": "error",
      "prefer-const": "warn",

      // Node.js specific rules
      "node/no-missing-require": "error",
      "node/no-unpublished-require": "off",
      "node/no-unsupported-features/es-syntax": "off", // Allow import/export
      "node/no-deprecated-api": "warn",
    },
  },
  // Express-specific patterns (optional)
  {
    files: ["routes/**/*.js", "controllers/**/*.js"],
    rules: {
      "no-unused-vars": ["warn", { argsIgnorePattern: "req|res|next" }], // Ignore unused Express params
    },
  },
];
