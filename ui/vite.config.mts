import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';
import { visualizer } from 'rollup-plugin-visualizer';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isAnalyze = mode === 'analyze';

  return {
    plugins: [
      react(),
      tsconfigPaths({ projects: ['tsconfig.app.json'] }),

      // PWA Support
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['monstrino_icon.svg', 'vite.svg'],
        manifest: {
          name: 'Monstrino',
          short_name: 'Monstrino',
          description: 'Monster High Collection & Release Hub',
          theme_color: '#ff69b4',
          background_color: '#0a0a0a',
          display: 'standalone',
          icons: [
            {
              src: '/monstrino_icon.svg',
              sizes: '512x512',
              type: 'image/svg+xml',
              purpose: 'any maskable',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
          runtimeCaching: [
            {
              urlPattern: /^https:\/\/api\.monstrino\.com\/.*/i,
              handler: 'NetworkFirst',
              options: {
                cacheName: 'api-cache',
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 60 * 24, // 24 hours
                },
                cacheableResponse: {
                  statuses: [0, 200],
                },
              },
            },
          ],
        },
        devOptions: {
          enabled: false,
        },
      }),

      // Image Optimization (only in production)
      command === 'build' &&
        ViteImageOptimizer({
          png: {
            quality: 85,
          },
          jpeg: {
            quality: 80,
          },
          jpg: {
            quality: 80,
          },
          webp: {
            quality: 85,
          },
          svg: {
            plugins: [
              {
                name: 'removeViewBox',
                active: false,
              },
              {
                name: 'removeEmptyAttrs',
                active: true,
              },
            ],
          },
        }),

      // Bundle Analysis (only when analyze mode is enabled)
      isAnalyze &&
        visualizer({
          open: true,
          filename: 'dist/stats.html',
          gzipSize: true,
          brotliSize: true,
        }),
    ].filter(Boolean),

    server: {
      port: 3000,
    },

    build: {
      sourcemap: true,
      rollupOptions: {
        output: {
          // Manual chunking for better code splitting
          manualChunks: {
            // Vendor chunks
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'mui-vendor': ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
            'query-vendor': ['@tanstack/react-query'],
            'state-vendor': ['mobx', 'mobx-react-lite'],
            'animation-vendor': ['gsap', 'ogl'],
            'chart-vendor': ['recharts'],
            'utils-vendor': ['axios', 'i18next', 'react-i18next', 'zod'],
          },
        },
      },
      // Performance optimizations
      chunkSizeWarningLimit: 1000,
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: command === 'build',
          drop_debugger: true,
        },
      },
    },

    define: {
      __APP_NAME__: JSON.stringify('Monstrino'),
      __APP_VERSION__: JSON.stringify(env.npm_package_version || '0.0.0'),
    },

    // Optimize dependencies
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@mui/material',
        '@tanstack/react-query',
      ],
    },
  };
});
