import { AppContextProviders, Page } from '@local/components/app'

import '@local/styles/globals.scss'

export default function App({ Component, pageProps }) {
  return (
    <AppContextProviders {...pageProps}>
      <Page>
        {/* The page component, as exported by an index.js file inside /src/pages: */}
        <Component />
      </Page>
    </AppContextProviders>
  )
}
