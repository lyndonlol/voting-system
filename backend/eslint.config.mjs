import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import prettier from "eslint-plugin-prettier/recommended";

export default tseslint.config(
  eslint.configs.recommended,

  ...tseslint.configs.recommended,
  ...tseslint.configs.strictTypeChecked,

  // Configure language options for all files
  {
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },

  // Custom rules
  {
    rules: {
      "no-console": "warn",
      "@typescript-eslint/explicit-function-return-type": "warn",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
    },
  },

  prettier,

  {
    ignores: ["dist/", "build/", "node_modules/"],
  },
);
