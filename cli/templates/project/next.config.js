const path = require("path")
const withPlugins = require("next-compose-plugins")
const yaml = require("next-plugin-yaml")

const resolve = (dirPath) => path.resolve(__dirname, dirPath)

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  webpack5: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@local/*": resolve("src/*"),
    }
    config.resolve.fallback = { fs: false }
    return config
  },
}

module.exports = withPlugins([[yaml], nextConfig])
