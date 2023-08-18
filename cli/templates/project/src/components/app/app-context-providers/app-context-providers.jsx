import { UserPreferencesProvider } from "@wethegit/react-hooks"

import { SiteStateProvider, LocaleProvider } from "@local/context"

export function AppContextProviders({ children, localeData, ...pageProps }) {
  return (
    <SiteStateProvider version={pageProps.version}>
      <LocaleProvider locale={localeData} {...pageProps}>
        <UserPreferencesProvider>{children}</UserPreferencesProvider>
      </LocaleProvider>
    </SiteStateProvider>
  )
}
