const withPlugins = require("next-compose-plugins")
const yaml = require("next-plugin-yaml")

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
}

module.exports = withPlugins([[yaml], nextConfig])
