import path from "path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import dts from "vite-plugin-dts";

const dirname =
  typeof __dirname !== "undefined"
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    dts({
      insertTypesEntry: true,
      include: ["src"],
      exclude: ["src/stories", "**/*.stories.*", "src/main.tsx", "src/App.tsx"],
      pathsToAliases: false,
      aliasesExclude: [/@\//],
      tsconfigPath: "./tsconfig.app.json",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(dirname, "./src"),
    },
  },
  build: {
    copyPublicDir: false,
    lib: {
      entry: path.resolve(dirname, "src/index.ts"),
      name: "NccoUI",
      formats: ["es", "cjs"],
      fileName: (format) => `ncco-ui.${format}.js`,
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith(".css")) {
            return "ncco-ui.css"
          }
          return assetInfo.name ?? "[name][extname]"
        }, 
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
