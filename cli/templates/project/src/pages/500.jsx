import { setupProps } from "@local/utils/page-setup"

export default function FiveHundred({ locale, globals }) {
  return (
    <>
      <header className="content-spacing">
        <h1>Error</h1>
      </header>
    </>
  )
}

export const getStaticProps = async (ctx) => setupProps(ctx)
