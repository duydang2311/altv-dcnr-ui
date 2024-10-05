import * as path from 'node:path';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';

// import devtools from 'solid-devtools/vite';

export default defineConfig({
  plugins: [
    /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
    // devtools(),
    solidPlugin(),
    Icons({
      compiler: 'solid',
      customCollections: {
        custom: FileSystemIconLoader('./src/lib/assets/icons', (svg) =>
          svg.replace(/^<svg /, '<svg fill="currentColor" '),
        ),
      },
    }),
  ],
  server: {
    port: 3000,
  },
  build: {
    target: 'esnext',
  },
  resolve: {
    alias: {
      $components: path.resolve('./src/lib/components'),
      $lib: path.resolve('./src/lib'),
      '~': path.resolve('./src'),
    },
  },
});
