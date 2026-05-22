import { Link } from "@local/components"
import { useLocale } from "@local/hooks"

export function HomeHeader() {
  const { page } = useLocale()

  return (
    <header>
      <h1>{page.title}</h1>
      <p>{page.subtitle}</p>
      <nav>
        <ul>
          <li>
            <Link href="/sub-page">Sub-page</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}
