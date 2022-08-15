import PropTypes from "prop-types"
import NextLink from "next/link"
import useLocale from "../hooks/use-locale"
import { defaultLocale } from "../config-locales"

/**
 * Creates a link using client-side navigation.
 */
const Link = ({ children, href, ignoreLocale, ...props }) => {
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

Link.defaultProps = {
  ignoreLocale: false,
}

Link.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
  href: PropTypes.string.isRequired,
  ignoreLocale: PropTypes.bool,
}

export default Link
