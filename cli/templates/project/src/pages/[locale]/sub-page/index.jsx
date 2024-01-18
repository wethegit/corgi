import { SubPageLayout } from "@local/layouts"
import { setupPaths, setupProps } from "@local/utilities"

const LOCALE_FOLDER = "subpage"

export default function Subpage({}) {
  return <SubPageLayout />
}

export const getStaticPaths = async () => setupPaths(LOCALE_FOLDER)
export const getStaticProps = async (ctx) => setupProps(ctx, LOCALE_FOLDER)
