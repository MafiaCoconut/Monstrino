import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths';
import { pigment } from "@pigment-css/vite-plugin";
import { makeTheme } from "./src/shared/theme/theme"; // твоя тема

export default defineConfig(({ command, mode }) => {
  // const env = loadEnv(mode, process.cwd(), '');          // подтянет .env, .env.local и т.п.
  // const ENABLE_PIGMENT = env.ENABLE_PIGMENT !== 'false'; // строковые env
  const ENABLE_PIGMENT = false
  return {
    plugins: [
      ENABLE_PIGMENT && pigment({
        transformLibraries: ['@mui/material'],
        include: ['src/**/*.{ts,tsx}'],
      }),
      react(),
      tsconfigPaths({ projects: ['tsconfig.app.json'] }),
    ].filter(Boolean),
    server: { port: 3000 },
    build: { sourcemap: true },
    define: {
      __APP_NAME__: JSON.stringify('Monstrino'),
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    }
  };
});