import { setupProps } from "@local/utils"

export default function Four0hFour() {
  return (
    <header>
      <h1>Page not found</h1>
    </header>
  )
}

export const getStaticProps = async (ctx) => setupProps(ctx)
