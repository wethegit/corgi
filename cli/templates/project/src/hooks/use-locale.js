/**
 * Retrieve locale data for the currently visible page.
 *
 * @example
 * -------
 * const { locale, localeMap, globals, page, alternativeLocales } = useLocale()
 * -------
 *
 * @returns {Object} returns an object containing the locale, global locale
 * data, page-level locale data, any values defined in config-locales.js
 * localesMap, and alternativeLocales available for the current page.
 */

import { useContext } from "react";
import { LocaleContext } from "#context/locale-context";
import { PageContext } from "#context/page-context";
import { SiteStateContext } from "#context/site-state-context";

const useLocale = (setPage) => {
  const localeCache = useContext(LocaleContext);
  const pageContext = useContext(PageContext);
  const { pageHistory } = useContext(SiteStateContext);

  if (setPage && localeCache.get(setPage))
    return { ...localeCache.get(setPage) };
  if (pageContext && pageContext.page && localeCache.get(pageContext.page))
    return { ...localeCache.get(pageContext.page) };
  if (pageHistory && pageHistory.length && localeCache.get(pageHistory[0]))
    return { ...localeCache.get(pageHistory[0]) };
  return { ...Array.from(localeCache.values()).pop() };
};

export default useLocale;
