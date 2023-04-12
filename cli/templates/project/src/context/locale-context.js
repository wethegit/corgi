/**
 * Maintains a globally-available data store for the current locale.
 *
 * The three main properties this keeps track of are:
 * - locale   (slugs, such as "en", "fr", "es", etc.)
 * - globals  (project-level data as specified in the locales YAML)
 * - page     (page-level data as specified in the locales YAML)
 *
 * This also exposes a dispatcher to update any of the above values,
 * and a `pageReady` flag, which just lets us know whether the page-level
 * YAML data has been successfully added to the Context.
 *
 * For the most part, you should use the `useLocale` interface
 * to work with this context (see `/hooks/use-locale.js`)
 */

import { createContext, useState, useEffect, useContext } from "react"
import { SiteStateContext } from "@local/context/site-state-context"

const LocaleContext = createContext()

const LocaleProvider = ({ children, locale, pageSlug }) => {
  const [localeCache, setCache] = useState()
  const { addPage } = useContext(SiteStateContext)

  useEffect(() => {
    addPage(locale.pageName)
    let newCache = new Map(localeCache)
    newCache.set(locale.pageName, { ...locale })
    setCache(newCache)
  }, [locale])

  const initLocale = new Map()
  initLocale.set(locale.pageName, { ...locale })

  return (
    <LocaleContext.Provider value={localeCache ? localeCache : initLocale}>
      {children}
    </LocaleContext.Provider>
  )
}

export { LocaleProvider as default, LocaleContext }
