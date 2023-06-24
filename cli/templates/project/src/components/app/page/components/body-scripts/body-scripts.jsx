// import Script from "next/script"

import { useLocale } from "@local/hooks"

/**
 * Add scripts to the bottom of the <body> here.
 * See the next/script docs for details and options:
 * https://nextjs.org/docs/basic-features/script
 */
export function BodyScripts() {
  const { globals, page } = useLocale()
  return (
    <>
      {/* add scripts like so: */}
      {/* <Script src="https://some-script.js" /> */}
      {/* <Script src="https://some-other-script.js" /> */}
    </>
  )
}
