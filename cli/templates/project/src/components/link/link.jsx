import NextLink from "next/link"

import { useLocale } from "@local/hooks"
import { defaultLocale } from "@local/config-locales"

/**
 * Creates a link using client-side navigation.
 */
export function Link({ children, href, ignoreLocale, ...props }) {
  const { locale } = useLocale()

  if (!href) return

  if (locale === defaultLocale && (href === "/" || href === "")) {
    ignoreLocale = true
    href = ""
  }

  return (
    <NextLink href={`/${ignoreLocale ? "" : locale}${href}`} {...props}>
      {children}
    </NextLink>
  )
}
