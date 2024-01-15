import { setupProps } from "@local/utilities"

export default function FiveHundred() {
  return (
    <header>
      <h1>Error</h1>
    </header>
  )
}

export const getStaticProps = async (ctx) => setupProps(ctx)
