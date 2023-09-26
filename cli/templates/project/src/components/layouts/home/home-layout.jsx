import { useLocale } from "@local/hooks"

import { HomeBody, HomeHeader } from "./components"

export function HomeLayout({ localeFolder }) {
  useLocale(localeFolder)

  return (
    <>
      <HomeHeader />
      <HomeBody />
    </>
  )
}
