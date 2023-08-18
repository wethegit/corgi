import { setupProps } from "@local/utils/page-setup"

export default function Four0hFour({ locale, globals }) {
  return (
    <>
      <header className="content-spacing">
        <h1>Page not found</h1>
      </header>
    </>
  )
}

export const getStaticProps = async (ctx) => setupProps(ctx)
