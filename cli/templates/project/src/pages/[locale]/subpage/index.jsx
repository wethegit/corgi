import { setupPaths, setupProps } from "@local/utils"
import { PageProvider } from "@local/context"
import { useLocale } from "@local/hooks"

const LOCALE_FOLDER = "subpage"

export default function Subpage({}) {
  const { page, globals } = useLocale(LOCALE_FOLDER)

  return (
    <PageProvider page={LOCALE_FOLDER}>
      <header>
        <h1>{page.title}</h1>
        <p>{page.subtitle}</p>
      </header>
    </PageProvider>
  )
}

export const getStaticPaths = () => setupPaths(LOCALE_FOLDER)
export const getStaticProps = async (ctx) => setupProps(ctx, LOCALE_FOLDER)
