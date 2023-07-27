import { defineConfig, Plugin } from "vite";
import path from "path";
import dts from "vite-plugin-dts";

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
      dts({
        skipDiagnostics: false,
      }) as unknown as Plugin,
    ],
  };
});