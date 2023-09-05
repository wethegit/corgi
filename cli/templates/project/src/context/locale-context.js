import { createContext, useState, useEffect, useContext } from "react"

import { SiteStateContext } from "@local/context"

/**
 * Maintains a globally-available data store for the current locale.
 *
 * For the most part, you should use the `useLocale` interface
 * to work with this context (see `/hooks/use-locale.js`)
 */
export const LocaleContext = createContext()

export function LocaleProvider({ children, locale }) {
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
