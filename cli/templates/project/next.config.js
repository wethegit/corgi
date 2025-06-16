const path = require("node:path")

const webpack = require("webpack")
const withPlugins = require("next-compose-plugins")
const yaml = require("next-plugin-yaml")

const resolve = (dirPath) => path.resolve(__dirname, dirPath)

if (process.env.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_URL) {
  console.log(
    "\x1b[33m",
    "⚠️ ------------------------------ Warning ------------------------------ ⚠️"
  )
  console.log("NEXT_PUBLIC_URL environment variable is not defined!")
  console.log("Please create a .env file in the root directory of your project.")
  console.log("NEXT_PUBLIC_URL should be set to the URL of your production site.")
  console.log(
    "⚠️ ---------------------------- End Warning ---------------------------- ⚠️"
  )
}

const nextConfig = {
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "~/*": resolve("./*"),
      "@local/*": resolve("src/*"),
    }

    // This fixes and issue with Webpack 5 no longer polyfilling node core modules for the browser.
    config.resolve.fallback = {
      fs: false,
    }
    config.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^node:/, (resource) => {
        resource.request = resource.request.replace(/^node:/, "")
      })
    )

    // insert js-yaml-loader
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: "js-yaml-loader",
    })

    return config
  },
}

module.exports = withPlugins([[yaml], nextConfig])
