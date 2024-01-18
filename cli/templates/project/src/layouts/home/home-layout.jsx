import { Page } from "@local/components"

import { HomeBody, HomeHeader } from "./components"

export function HomeLayout() {
  return (
    <Page>
      <HomeHeader />
      <HomeBody />
    </Page>
  )
}
