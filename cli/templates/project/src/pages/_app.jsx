import { useRouter } from "next/router"

import { AppContextProviders, Page, PageTransition } from "@local/components/app"

import "@local/styles/globals.scss"

export default function App({ Component, pageProps }) {
  const router = useRouter()

  return (
    <AppContextProviders {...pageProps}>
      <Page {...pageProps}>
        {/* The page component, as exported by an index.js file inside /src/pages: */}
        <PageTransition location={router.pathname} options={pageProps.transition}>
          <Component {...pageProps} />
        </PageTransition>
      </Page>
    </AppContextProviders>
  )
}
