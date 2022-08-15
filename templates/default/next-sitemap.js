// Having next-sitemap command & next-sitemap.js file may result in file opening instead of building sitemaps in windows machines. Please read more about the issue here: https://github.com/iamvishnusankar/next-sitemap/issues/61#issuecomment-725999452

// As a solution to this, it is now possible to use a custom config file instead of next-sitemap.js. Just pass --config <your-config-file>.js to build command.

const { defaultLocale } = require("./src/config-locales")

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_URL,
  generateRobotsTxt: true,
}
