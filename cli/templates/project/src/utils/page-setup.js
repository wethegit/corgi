import localeConfig from "@local/config-locales"

const { defaultLocale } = localeConfig

const getAvailableLocales = (pageName) => {
  if (!pageName) return []
  const glob = require("glob")
  const yamls = Array.from(localeConfig.localeMap.entries())
    .map(([locale]) => glob.sync(`./src/locales/${pageName}/${locale}.{yml, yaml}`))
    .flat()
  return yamls.map((path) => path.split("/").pop().split(".").shift())
}

/**
 * Generate localized paths for the current page. This is required for SSG.
 */
export function setupPaths(pageName) {
  if (!pageName) return { fallback: false, paths: [] }

  const locales = getAvailableLocales(pageName)

  const paths = locales.map((locale) => {
    return {
      params: { locale: locale },
    }
  })

  return {
    fallback: false,
    paths,
  }
}

/**
 * Generate page props for the current page
 * @param {Object} ctx - the page context as passed by Next.js
 */
export async function setupProps(ctx, pageName) {
  const locale = ctx?.params?.locale || defaultLocale

  const YAML = require("yamljs")

  let pageLocales = {}
  let globalLocales = {}
  let localeMap = {}
  let alternativeLocales = []

  if (pageName)
    try {
      const file = `./src/locales/${pageName}/${locale}.yml`
      pageLocales = YAML.load(file)
    } catch (err) {
      console.error(` ${locale} locales file for ${pageName} not found.`)
    }

  try {
    const file = `./src/locales/globals/${locale}.yml`
    globalLocales = YAML.load(file)
  } catch (err) {
    console.error(`Global locales file for ${locale} not found.`)
  }

  if (localeConfig.localeMap) localeMap = localeConfig.localeMap.get(locale) || {}

  alternativeLocales = getAvailableLocales(pageName).filter((d) => d !== locale) || []

  // Plucking out a "slug" for omniture tracking
  const pageNameParts = pageName ? pageName.split("/") : ["home"]
  const pageSlug = pageNameParts[pageNameParts.length - 1]

  return {
    props: {
      version: require("../../package.json")?.version || 0,
      pageSlug,
      localeData: {
        pageName: pageName || null,
        locale,
        localeMap,
        page: pageLocales || {},
        globals: globalLocales || {},
        alternativeLocales,
      },
    },
  }
}
