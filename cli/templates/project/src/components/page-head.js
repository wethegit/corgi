/**
 * This component handles PAGE-LEVEL meta tags and <head> content.
 * For GLOBAL meta tags and <head> content, please see `pages/_document.js`
 *
 * For more information on how this works, see the next/head docs:
 * https://nextjs.org/docs/api-reference/next/head
 *
 * For importing third-party scripts, see the next/script docs:
 * https://nextjs.org/docs/basic-features/script
 */

import Head from "next/head"
import { useRouter } from "next/router"
import useLocale from "@local/hooks/use-locale"
import localeConfig, { defaultLocale } from "../config-locales"
import { TLDN } from '../consts'

const fallbackTitle = "DON'T FORGET TO ADD A TITLE!"
const fallbackDesc = "DON'T FORGET TO ADD A DESCRIPTION!"

const PageHead = ({}) => {
  const { page, globals, alternativeLocales } = useLocale()
  const router = useRouter()

  const getPageUrl = () => {
    return TLDN + router.asPath
  }

  const getTitle = () => {
    return page?.meta?.title || globals?.meta?.title || fallbackTitle
  }

  const getDescription = () => {
    return page?.meta?.description || globals?.meta?.description || fallbackDesc
  }

  const getOGAlt = () => {
    return globals?.meta?.og_alt || null
  }

  return (
    <Head>
      <title key="title">{getTitle()}</title>
      <meta name="description" content={getDescription()} key="meta-desc" />

      <meta property="og:title" content={getTitle()} key="og-title" />
      <meta property="og:description" content={getDescription()} key="og-desc" />
      <meta property="og:url" content={getPageUrl()} key="og-url" />
      {getOGAlt() && <meta property="og:image:alt" content={getOGAlt()} key="og-alt" />}

      <meta
        name="tw:description"
        content={`${getDescription()} ${getPageUrl()}`}
        key="twitter-desc"
      />

      {alternativeLocales.map((altLocale) => {
        // This code is to add the <link hreflang> tags.
        // More info here https://developers.google.com/search/docs/advanced/crawling/localized-versions

        // First we set the language to the default locale string
        let lang = altLocale

        // Now we check the localeMap in config for the
        // alternative locale
        const mappedAltLocale = localeConfig.localeMap
          ? localeConfig.localeMap.get(altLocale)
          : {}

        // If the mapped object and the regionValue exists
        // we replace the lang with that rather than the default
        if (localeConfig.langValue && mappedAltLocale) {
          lang = mappedAltLocale[localeConfig.langValue] || altLocale
        }

        // We grab the pathname
        let path = router.pathname

        // if this page is the index of the [locales] folder
        // and the alternative locale is the default locale
        // then we need to switch the path to the root ('/')
        if (path === "/[locale]" && altLocale === defaultLocale) path = "/"
        // Alternativily if this is the index of the root then we
        // know the other paths will need to be '/[locale]'
        else if (path === "/") path = "/[locale]"

        // add a trailing /
        if (path.length > 1) path = path + "/"

        // replace the [locale] in the path with the actual altLocale
        let href = TLDN + path.replace("[locale]", altLocale)

        // return the tag
        return <link key={altLocale} rel="alternate" hrefLang={lang} href={href} />
      })}
    </Head>
  )
}

export default PageHead
