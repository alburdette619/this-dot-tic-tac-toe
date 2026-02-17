const cspellESLintPluginRecommended = require("@cspell/eslint-plugin/recommended");
const expoConfig = require("eslint-config-expo/flat");
const perfectionist = require("eslint-plugin-perfectionist");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
const { defineConfig } = require("eslint/config");

module.exports = defineConfig([
  expoConfig,
  cspellESLintPluginRecommended,
  eslintPluginPrettierRecommended,
  {
    ignores: ["dist/*"],
    plugins: {
      perfectionist,
    },
    rules: {
      "@cspell/spellchecker": [
        "warn",
        {
          configFile: "./cspell.config.ts",
        },
      ],
      "perfectionist/sort-imports": "error",
    },
  },
]);
