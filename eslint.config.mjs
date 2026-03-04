// eslint.config.mjs
import cspellESLintPluginRecommended from "@cspell/eslint-plugin/recommended";
import expoConfig from "eslint-config-expo/flat.js";
import { configs as perfectionistConfigs } from "eslint-plugin-perfectionist";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import { defineConfig } from "eslint/config";

// Resolve relative to *this* config file, not process.cwd()
const cspellConfigUrl = new URL(
  "./cspell.config.mts",
  import.meta.url,
).toString();

export default defineConfig([
  expoConfig,
  cspellESLintPluginRecommended,
  perfectionistConfigs["recommended-natural"],
  {
    ignores: ["dist/*"],
    rules: {
      "@cspell/spellchecker": [
        "warn",
        {
          configFile: cspellConfigUrl,
        },
      ],
    },
  },

  // Recommended to keep this last in flat config
  eslintPluginPrettierRecommended,
]);
