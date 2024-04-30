import { useLocale } from "@local/hooks"

export function HomeHeader() {
  const { page } = useLocale()

  return (
    <header>
      <h1>{page.title}</h1>
      <p>{page.subtitle}</p>
    </header>
  )
}
