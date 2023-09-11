import { defineConfig, Plugin } from "vite";
import path from "path";
import dts from "vite-plugin-dts";
import { viteStaticCopy } from 'vite-plugin-static-copy'

const name = "kontent-ai-astro";

export default defineConfig(() => {
  return {
    root: path.resolve(__dirname, 'src'),
    build: {
      outDir: path.resolve(__dirname, 'dist'),
      emptyOutDir: true,
      lib: {
        entry: path.resolve(__dirname, "src/index.ts"),
        name: "kontentAiAstro",
        fileName: (format) => (format === "es" ? `${name}.mjs` : `${name}.js`),
      },
    },

    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: 'KontentAiComponent.astro',
            dest: '.'
          }
        ]
      }),
      dts({
        skipDiagnostics: false,
      }) as unknown as Plugin,
    ],
  };
});