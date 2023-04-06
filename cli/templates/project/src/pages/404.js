import { setupProps } from "#utils/page-setup"

const Four0hFour = ({ locale, globals }) => {
  return (
    <>
      <header className="content-spacing">
        <h1>Page not found</h1>
      </header>
    </>
  )
}

export const getStaticProps = async (ctx) => setupProps(ctx)

export default Four0hFour
