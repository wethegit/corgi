// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "corgi",
  tagline:
    "A framework for creating static, localized, React web applications with Next.js",
  url: "https://wethegit.github.io/",
  baseUrl: "/corgi/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "wethegit",
  projectName: "corgi",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
        },
        blog: {
          showReadingTime: true,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "corgi",
        logo: {
          alt: "corgi logo",
          src: "img/corgi.svg",
        },
        items: [
          {
            type: "doc",
            docId: "intro",
            position: "left",
            label: "Docs",
          },
          // { to: "/blog", label: "Blog", position: "left" },
          {
            href: "https://github.com/wethegit/corgi",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      sidebar: {
        autoCollapseCategories: true,
        breakcrumbs: true,
        hideable: true,
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Tutorial",
                to: "/docs/intro",
              },
            ],
          },
          {
            title: "we { the collective }",
            items: [
              {
                label: "CodePen",
                href: "https://codepen.io/team/wtc",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/wethegit",
              },
              {
                label: "NPM",
                href: "https://www.npmjs.com/~wethecollective",
              },
            ],
          },
          {
            title: "Contribute",
            items: [
              // {
              //   label: "Blog",
              //   to: "/blog",
              // },
              {
                label: "GitHub",
                href: "https://github.com/wethegit/corgi",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} We the Collective.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
