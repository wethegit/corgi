import { setupProps } from "@local/utils/page-setup"

const FiveHundred = ({ locale, globals }) => {
  return (
    <>
      <header className="content-spacing">
        <h1>Error</h1>
      </header>
    </>
  )
}

export const getStaticProps = async (ctx) => setupProps(ctx)

export default FiveHundred
