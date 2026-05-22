const { defaultLocale } = require("./src/config-locales")

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_URL,
  generateRobotsTxt: true,
  exclude: [`/${defaultLocale}`],
}