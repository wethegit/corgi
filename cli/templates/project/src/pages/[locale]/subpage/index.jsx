import { useLocale } from "@local/hooks"
import { setupPaths, setupProps } from "@local/utils"

const LOCALE_FOLDER = "subpage"

export default function Subpage({}) {
  const { page, globals } = useLocale()

  return (
    <header>
      <h1>{page.title}</h1>
      <p>{page.subtitle}</p>
    </header>
  )
}

export const getStaticPaths = async () => setupPaths(LOCALE_FOLDER)
export const getStaticProps = async (ctx) => setupProps(ctx, LOCALE_FOLDER)