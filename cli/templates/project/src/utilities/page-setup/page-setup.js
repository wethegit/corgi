import localeConfig from "@local/config-locales"

import { deepMerge } from "../deep-merge"

const { defaultLocale, localeMap } = localeConfig

async function getAvailableLocales(pageName) {
  if (!pageName) return []

  const glob = require("glob")

  const yamls = Object.keys(localeMap)
    .map((locale) => glob.sync(`./src/locales/${pageName}/${locale}.yml`))
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

  let pageLocale = {}
  let pageIndex = {}
  let globalsIndex = {}
  let globalsLocale = {}
  let alternativeLocales = []

  if (pageName) {
    try {
      pageLocale = await import(
        /* webpackMode: "eager" */ `../../locales/${pageName}/${locale}.yml`
      ).then((m) => m.default)
    } catch (err) {
      console.error(` ${locale} locales file for ${pageName} not found.`)
    }

    try {
      pageIndex = await import(
        /* webpackMode: "eager" */ `../../locales/${pageName}/index.yml`
      ).then((m) => m.default)
    } catch (err) {
      // no problem if there isn't an index file
    }
  }

  try {
    globalsLocale = await import(
      /* webpackMode: "eager" */ `../../locales/globals/${locale}.yml`
    ).then((m) => m.default)
  } catch (err) {
    console.error(`Global locales file for ${locale} not found.`)
  }

  try {
    globalsIndex = await import(
      /* webpackMode: "eager" */ `../../locales/globals/index.yml`
    ).then((m) => m.default)
  } catch (_) {
    // no problem if there isn't an index file
  }

  try {
    const availableLocales = await getAvailableLocales(pageName)
    alternativeLocales = availableLocales?.filter((d) => d !== locale) || []
  } catch (err) {
    console.error(`Error getting alternative locales for ${pageName}`)
  }

  return {
    props: {
      version: globalIndexLocale.version || 0,
      localeData: {
        pageName: pageName || null,
        locale,
        localeMap,
        page: deepMerge(pageIndex || {}, pageLocale || {}),
        globals: deepMerge(globalsIndex || {}, globalsLocale || {}),
        alternativeLocales,
      },
    },
  }
}
