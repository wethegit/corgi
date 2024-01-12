import { SubPageLayout } from "@local/components/layouts"
import { setupPaths, setupProps } from "@local/utils"

const LOCALE_FOLDER = "subpage"

export default function Subpage({}) {
  return <SubPageLayout />
}

export const getStaticPaths = async () => setupPaths(LOCALE_FOLDER)
export const getStaticProps = async (ctx) => setupProps(ctx, LOCALE_FOLDER)
