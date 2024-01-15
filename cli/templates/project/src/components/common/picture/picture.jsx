import { useEffect, useRef, forwardRef, useState } from "react"

import { breakpointMap, breakpointOrder } from "@local/utilities"

import register from "../../../../images_register.json"

/**
 * Image
 * Lets you easily create <picture> elements with 1x/2x srcsets and breakpoint-specific sources.
 * This component is opinionated in that srcset is assumed and _required_. If you don't want or
 * need to use <picture>, <source>, and srcset — just use a standard <img /> tag instead of this.
 * @typedef {Object} Picture
 * @property {String} [alt] - Alt text for the image.
 * @property {Array} [breakpoints] - An array of valid breakpoint strings. Markup will be
 * generated that expects 1x and -2x files for each breakpoint (small being the default).
 * For example, if you passed `["medium-up"]`, the markup would look for all of the following
 * images: "my-image.png", "my-image-2x.png", "my-image-medium-up.png", "my-image-medium-up-2x.png".
 * @property {String} [className] - CSS class names, as passed to the component when called.
 * @property {String} [pictureClassName] - CSS class names, as passed to the <picture> element.
 * @property {Boolean} [lazy] - Whether to use the browser's native lazy-loading. Equivalent
 * to the `loading="lazy"` HTML attribute.
 * @property {String} src - The path to — and filename of — the image within the `/public/`
 * folder This expects the standard/base filename, so no "2x" or breakpoint-specific suffixes
 * here — those will all be generated as needed by the component.
 * @property {Boolean} [webp] - Whether to use the WebP format for the image.
 *
 * @example
 * <Image
 *   src="/images/space-cowboy.jpg"
 *   alt="An American cowboy wearing an astronaut's helmet, holding a chrome rocket, and creepily
 *        looking into the distance."
 *   className="hero-art"
 *   lazy={true}
 *   breakpoints={["medium-up", "large-up"]}
 * />
 *
 */

/** @type React.FC<Picture> */
function Picture(
  { alt, breakpoints, className, pictureClassName, lazy, src, webp = false },
  ref
) {
  const fallbackRef = useRef()
  const [sortedBPs, setSortedBreakpoints] = useState(
    breakpoints || register[src]?.b || []
  )

  const imageInfo = register[src] || null

  src = (imageInfo ? "/_images/" : "/") + src

  const [filename, ext] = src.split(".")
  let extensions = [ext]
  if (imageInfo) {
    extensions = imageInfo.e
    if (!breakpoints) breakpoints = imageInfo.b
  } else {
    if (webp) extensions.unshift("webp")
  }

  // if (!breakpoints) breakpoints = []

  const srcSet = ext === "svg" ? null : `${src} 1x, ${filename}-2x.${ext} 2x`

  useEffect(() => {
    if (breakpoints) {
      setSortedBreakpoints(breakpointOrder.filter((d) => breakpoints.indexOf(d) >= 0))
    }
  }, [breakpoints])

  if (!src) return null

  return (
    <picture className={pictureClassName}>
      {sortedBPs &&
        sortedBPs.map((bp, i) => {
          return extensions.map((extension, j) => {
            const Tag = "source"
            const type = `image/${extension === "jpg" ? "jpeg" : extension}`

            return (
              <Tag
                key={`picture-source-${i}-${j}`}
                media={`(min-width: ${breakpointMap.get(bp)})`}
                srcSet={
                  srcSet &&
                  srcSet
                    .replaceAll(`.${ext}`, `.${extension}`)
                    .replace(`.${extension}`, `-${bp}.${extension}`)
                    .replace("-2x", `-${bp}-2x`)
                }
                width={imageInfo?.s[bp]?.w}
                height={imageInfo?.s[bp]?.h}
                type={type}
              />
            )
          })
        })}
      {extensions.map((extension, j) => {
        const type = `image/${extension === "jpg" ? "jpeg" : extension}`

        return (
          <source
            key={`picture-source-small-${j}`}
            srcSet={srcSet && srcSet.replaceAll(`.${ext}`, `.${extension}`)}
            type={type}
            width={imageInfo?.w}
            height={imageInfo?.h}
          />
        )
      })}
      <img
        className={className}
        {...{ alt, src }}
        loading={lazy && "lazy"}
        ref={ref || fallbackRef}
      />
    </picture>
  )
}

export default forwardRef(Picture)
