const path = require("path")
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
