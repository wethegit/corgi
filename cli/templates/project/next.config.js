const path = require("path")
const withPlugins = require("next-compose-plugins")
const yaml = require("next-plugin-yaml")

const resolve = (dirPath) => path.resolve(__dirname, dirPath)

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@local/components": resolve("src/components"),
      "@local/context": resolve("src/context"),
      "@local/hooks": resolve("src/hooks"),
      "@local/utils": resolve("src/utils"),
      "@local/styles": resolve("src/styles"),
    }
    return config
  },
}

module.exports = withPlugins([[yaml], nextConfig])
