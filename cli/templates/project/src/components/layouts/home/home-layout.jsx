import { Page } from "@local/components/common"

import { HomeBody, HomeHeader } from "./components"

export function HomeLayout() {
  return (
    <Page>
      <HomeHeader />
      <HomeBody />
    </Page>
  )
}
