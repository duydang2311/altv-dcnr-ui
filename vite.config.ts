import { svelte } from "@sveltejs/vite-plugin-svelte";
import * as path from "node:path";
import Icons from "unplugin-icons/vite";
import { defineConfig } from "vite";
import { FileSystemIconLoader } from "unplugin-icons/loaders";

export default defineConfig({
  plugins: [
    svelte(),
    Icons({
      compiler: "svelte",
      customCollections: {
        custom: FileSystemIconLoader("./src/lib/assets/icons", (svg) =>
          svg.replace(/^<svg /, '<svg fill="currentColor" ')
        ),
      },
    }),
  ],
  build: {
    target: "esnext",
  },
  resolve: {
    alias: {
      $components: path.resolve("./src/lib/components"),
      $lib: path.resolve("./src/lib"),
      "~": path.resolve("./src"),
    },
  },
});
