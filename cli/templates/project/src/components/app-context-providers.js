import { UserPreferencesProvider } from "@wethegit/react-hooks";

import LocaleProvider from "@local/context/locale-context";
import SiteStateProvider from "@local/context/site-state-context";

const AppContextProviders = ({ children, localeData, ...pageProps }) => {
  return (
    <SiteStateProvider version={pageProps.version}>
      <LocaleProvider locale={localeData} {...pageProps}>
        <UserPreferencesProvider>{children}</UserPreferencesProvider>
      </LocaleProvider>
    </SiteStateProvider>
  );
};

export default AppContextProviders;
