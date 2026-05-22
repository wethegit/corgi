import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import prettier from "eslint-config-prettier/flat"
import { importX } from "eslint-plugin-import-x"

// ⚠️ importX is a well-maintained fork of eslint-plugin-import, which actually *supports* ESLint's newer flat config.
// TODO: update this to the official eslint-plugin-import once *that* package supports flat config.

const eslintConfig = defineConfig([
  ...nextVitals,
  importX.flatConfigs.recommended,
  prettier,
  // Override default ignores of eslint-config-next.
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
  {
    settings: {
      "import-x/resolver": {
        alias: {
          map: [["@local", "./src"]],
          extensions: [".ts", ".js", ".jsx", ".json"],
        },
        node: {
          paths: ["./src"],
        },
      },
    },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react-hooks/set-state-in-effect": "warn",
      "@next/next/no-img-element": "off",
      "import-x/order": [
        "error",
        {
          "newlines-between": "always",

          pathGroups: [
            {
              pattern: "@local/**",
              group: "external",
              position: "after",
            },
          ],
        },
      ],
    },
  },
])

export default eslintConfig