import { AppContextProviders, AppHead, BodyScripts } from "@local/components/app"

export default function App({ Component, pageProps }) {
  return (
    <AppContextProviders {...pageProps}>
      <AppHead />
      <Component />
      <BodyScripts />
    </AppContextProviders>
  )
}
