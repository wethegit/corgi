import { setupPaths, setupProps } from "@local/utils/page-setup"
import PageProvider from "@local/context/page-context"
import useLocale from "@local/hooks/use-locale"

const LOCALE_FOLDER = "PAGE_SLUG"

const PAGE_NAME = ({}) => {
  const { page, globals } = useLocale(LOCALE_FOLDER)

  return (
    <PageProvider page={LOCALE_FOLDER}>
      <header>
        <h1>{page.header.title}</h1>
        <p>{page.header.body}</p>
      </header>

      <main></main>
    </PageProvider>
  )
}

export const getStaticPaths = () => setupPaths(LOCALE_FOLDER)
export const getStaticProps = async (ctx) => setupProps(ctx, LOCALE_FOLDER)

export default PAGE_NAME
