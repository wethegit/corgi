import { createContext, useState, useEffect, useContext, useMemo } from "react"

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
  const initLocale = useMemo(() => {
    const init = new Map()
    init.set(locale.pageName, { ...locale })
    return init
  }, [locale])

  useEffect(() => {
    if (!locale) return
    
    addPage(locale.pageName)

    setCache((cur) => {
      let newCache = new Map(cur)
      newCache.set(locale.pageName, { ...locale })
      return newCache
    })
  }, [locale, addPage])

  return (
    <LocaleContext.Provider value={localeCache ? localeCache : initLocale}>
      {children}
    </LocaleContext.Provider>
  )
}
