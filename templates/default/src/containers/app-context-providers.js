import LocaleProvider from "../context/locale-context"
import SiteStateProvider from "../context/site-state-context"
import UserPreferencesProvider from "../context/user-prefs-context"

const AppContextProviders = ({ children, localeData, ...pageProps }) => {
  return (
    <SiteStateProvider version={pageProps.version}>
      <LocaleProvider locale={localeData} {...pageProps}>
        <UserPreferencesProvider>{children}</UserPreferencesProvider>
      </LocaleProvider>
    </SiteStateProvider>
  )
}

export default AppContextProviders
