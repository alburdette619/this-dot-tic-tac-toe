const expoConfig = require("eslint-config-expo/flat");
const perfectionist = require("eslint-plugin-perfectionist");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
const { defineConfig } = require("eslint/config");

module.exports = defineConfig([
  expoConfig,
  eslintPluginPrettierRecommended,
  {
    ignores: ["dist/*"],
    plugins: {
      perfectionist,
    },
    rules: {
      "perfectionist/sort-imports": "error",
    },
  },
]);
