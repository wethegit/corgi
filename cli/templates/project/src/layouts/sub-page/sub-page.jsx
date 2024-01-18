import { Page } from "@local/components"
import { useLocale } from "@local/hooks"

export default function SubPageLayout() {
  const { page } = useLocale()

  return (
    <Page>
      <header>
        <h1>{page.title}</h1>
        <p>{page.subtitle}</p>
      </header>
    </Page>
  )
}
