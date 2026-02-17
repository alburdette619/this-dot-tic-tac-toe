import { defineConfig } from "cspell";

export default defineConfig({
  version: "0.2",
  ignorePaths: ["node_modules"],
  ignoreRegExpList: ["worklet(s)?"],
  words: ["prebuild", "Pressable"],
});
