import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';


const SITE_ENV = process.env.SITE_ENV ?? 'prod';

const SITE_URL = 'https://documentation.monstrino.com'
  // SITE_ENV === 'test'
  //   ? 'https://testing.monstrino.com'
  //   : 'https://monstrino.com';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)
const config: Config = {
  title: 'Monstrino Docs',
  tagline: '',
  favicon: 'img/monstrino_icon.svg',

  // Set the production url of your site here
  url: SITE_URL,
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',
  trailingSlash: false,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'monstrino', // Usually your GitHub org/user name.
  projectName: 'monstrino-docs', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          path: 'docs',
          routeBasePath: 'docs',
          sidebarPath: './sidebars.js',
          editUrl:
            'https://github.com/MafiaCoconut/Monstrino/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'dev-notes',
        path: 'dev-notes',
        routeBasePath: 'dev-notes',
        sidebarPath: './sidebars-dev-notes.js',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'why-monstrino',
        path: 'why-monstrino',
        routeBasePath: 'why-monstrino',
        sidebarPath: './sidebars-why-monstrino.js',
      },
    ],
    [
      '@easyops-cn/docusaurus-search-local',
      {
        hashed: true,
        language: ['en', 'ru'],
        indexDocs: true,
        indexPages: false,
        docsRouteBasePath: ['docs', 'dev-notes', 'why-monstrino'],
        docsDir: ['docs', 'dev-notes', 'why-monstrino'],
        searchResultLimits: 8,
        searchResultContextMaxLength: 50,
      },
    ],
    [
      '@docusaurus/plugin-pwa',
      {
        debug: false,
        offlineModeActivationStrategies: ['appInstalled', 'standalone', 'queryString'],
        pwaHead: [
          {tagName: 'link', rel: 'icon', href: '/img/monstrino_icon.svg'},
          {tagName: 'link', rel: 'manifest', href: '/manifest.json'},
          {tagName: 'meta', name: 'theme-color', content: '#ff2ca8'},
          {tagName: 'meta', name: 'apple-mobile-web-app-capable', content: 'yes'},
          {tagName: 'meta', name: 'apple-mobile-web-app-status-bar-style', content: '#ff2ca8'},
          {tagName: 'link', rel: 'apple-touch-icon', href: '/img/pwa_192.png'},
          {tagName: 'link', rel: 'mask-icon', href: '/img/monstrino_icon.svg', color: '#ff2ca8'},
          {tagName: 'meta', name: 'msapplication-TileImage', content: '/img/pwa_192.png'},
          {tagName: 'meta', name: 'msapplication-TileColor', content: '#ff2ca8'},
        ],
      },
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/monstrino_icon.svg',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: false,
      disableSwitch: false,
    },
    navbar: {
      hideOnScroll: false,
      title: 'Monstrino Docs',
      logo: {
        alt: 'My Site Logo',
        src: 'img/monstrino_icon.svg',
      },
      items: [
        {to: 'why-monstrino/intro', label: 'Why Monstrino', position: 'left'},
        {to: 'docs/intro', label: 'Docs', position: 'left'},
        {to: 'dev-notes/intro', label: 'Dev Notes', position: 'left'},
        // {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/MafiaCoconut/Monstrino',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `Copyright © ${new Date().getFullYear()} Monstrino. Monster High and all related characters, names, and trademarks are the property of Mattel, Inc. Monstrino is an independent platform and is not affiliated with or endorsed by Mattel. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    liveCodeBlock: {
      playgroundPosition: 'bottom',
    },
  } satisfies Preset.ThemeConfig,

  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid', '@docusaurus/theme-live-codeblock'],
};

export default config;
