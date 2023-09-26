import { useLocale } from "@local/hooks"
import { setupPaths, setupProps } from "@local/utils"

const LOCALE_FOLDER = "PAGE_SLUG"

const PAGE_NAME = () => {
  // useLocale _must_ be called in this component, passing the LOCALE_FOLDER.
  // Whether you need to destructure anything from its return value is up to you.
  const { page, globals } = useLocale(LOCALE_FOLDER)

  return (
    <>
      <header>
        <h1>{page.header.title}</h1>
        <p>{page.header.body}</p>
      </header>

      <main></main>
    </>
  )
}

export const getStaticPaths = async () => setupPaths(LOCALE_FOLDER)
export const getStaticProps = async (ctx) => setupProps(ctx, LOCALE_FOLDER)

export default PAGE_NAME
