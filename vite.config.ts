import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";
import dts from 'vite-plugin-dts';


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  console.log(env)
  return {
    plugins: [react(), dts({ tsconfigPath: path.resolve(__dirname, "./tsconfig.app.json") })],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    ...(!!env.VITE_BUILD_LIB && {
      build: {
        lib: {
          entry: {
            'app': path.resolve(__dirname, "./src/app.tsx"),
          },
          name: "app",
        },
        sourcemap: true,
        emptyOutDir: true,
      },
    }),
  }
});
