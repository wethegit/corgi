import { useCallback, useEffect, useState } from "react"

/**
 * Access the current media query (breakpoint) as defined in your project's layout settings.
 * This hook depends on the "breakpoint snipe" being present on the <body> tag's `::after`
 * pseudo-element (see /src/styles/helpers/_helpers-layout.scss for more details on that).
 * 
 * @returns {Object} properties include:
 * {String} breakpointName
 * {Number} breakpointIndex
 * {Object} BREAKPOINTS
 * {Boolean} mediumUp
 * {Boolean} mediumDown
 * {Boolean} largeUp
 * {Boolean} xlargeUp
 * 
 * @example
 * const { breakpointName, largeUp, BREAKPOINTS } = useBreakpoints()
 * ...
 * {largeUp && <p>This only renders at Large+</p>}
 * {breakpointName === BREAKPOINTS.small && <p>This only renders at small</p>}
 */
const BREAKPOINT_MAP = new Map([
  ["S", [1, "small"]],
  ["M", [2, "medium"]],
  ["L", [3, "large"]],
  ["XL", [4, "xlarge"]],
  ["XXL", [5, "xxlarge"]],
])

const BREAKPOINTS = [...BREAKPOINT_MAP].reduce((acc, curr) => {
  const name = curr[1][1]
  acc[name] = name
  return acc
}, {})

const useBreakpoints = () => {
  const [currentBP, setCurrentBP] = useState([null, null])
  const [breakpointIndex, breakpointName] = currentBP
  
  const handleResize = useCallback((e) => {
    if (typeof window === "undefined") return

    setCurrentBP(
      BREAKPOINT_MAP.get(
        window
          .getComputedStyle(document.querySelector("body"), "::after")
          .content.replace(/'|"/gi, "")
      )
    )
  }, [])

  useEffect(() => {
    window.addEventListener("resize", handleResize)

    handleResize()

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return {
    breakpointIndex,
    breakpointName,
    mediumUp: breakpointIndex > 1,
    mediumDown: breakpointIndex < 3,
    largeUp: breakpointIndex > 2,
    xlargeUp: breakpointIndex > 3,
    BREAKPOINTS,
  }
}

export default useBreakpoints
