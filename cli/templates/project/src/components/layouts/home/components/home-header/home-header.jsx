import { useLocale } from "@local/hooks"

export function HomeHeader() {
  const { page } = useLocale()

  return (
    <header className="content-spacing">
      <h1 className="margin-bottom-2 margin-bottom-large-2">{page.title}</h1>

      <p>{page.subtitle}</p>
    </header>
  )
}
