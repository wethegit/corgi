import localeConfig from "@local/config-locales"

const { defaultLocale } = localeConfig

async function getAvailableLocales(pageName) {
  if (!pageName) return []

  const glob = require("glob")

  const yamls = Array.from(localeConfig.localeMap.entries())
    .map(([locale]) => glob.sync(`./src/locales/${pageName}/${locale}.yml`))
    .flat()

  return yamls.map((path) => path.split("/").pop().split(".").shift())
}

/**
 * Generate localized paths for the current page. This is required for SSG.
 */
export async function setupPaths(pageName) {
  if (!pageName) return { fallback: false, paths: [] }

  const locales = await getAvailableLocales(pageName)

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
  const locale =
    ctx.locale || ctx?.params?.locale || ctx.defaultLocale || defaultLocale || "en-us"

  let pageLocales = {}
  let globalLocales = {}
  let localeMap = {}
  let alternativeLocales = []

  if (pageName)
    try {
      pageLocales = await import(
        /* webpackMode: "eager" */ `../locales/${pageName}/${locale}.yml`
      ).then((m) => m.default)
    } catch (err) {
      console.error(` ${locale} locales file for ${pageName} not found.`)
    }

  try {
    globalLocales = await import(
      /* webpackMode: "eager" */ `../locales/globals/${locale}.yml`
    ).then((m) => m.default)
  } catch (err) {
    console.error(`Global locales file for ${locale} not found.`)
  }

  if (localeConfig.localeMap) localeMap = localeConfig.localeMap.get(locale) || {}

  try {
    const availableLocales = await getAvailableLocales(pageName)
    alternativeLocales = availableLocales?.filter((d) => d !== locale) || []
  } catch (err) {
    console.error(`Error getting alternative locales for ${pageName}`)
  }

  // Plucking out a "slug" for omniture tracking
  const pageNameParts = pageName ? pageName.split("/") : ["home"]
  const pageSlug = pageNameParts[pageNameParts.length - 1]
  const packageJson = await import(/* webpackMode: "eager" */ `../../package.json`).then(
    (m) => m.default
  )

  return {
    props: {
      version: packageJson?.version || 0,
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
