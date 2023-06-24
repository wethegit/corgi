import { HomeBody, HomeHeader } from "./components"

export function HomeLayout({ version }) {
  return (
    <>
      <HomeHeader />
      <HomeBody version={version} />
    </>
  )
}