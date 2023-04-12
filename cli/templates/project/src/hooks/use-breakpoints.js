import { useCallback, useEffect, useState } from "react"

const BREAKPOINT_MAP = new Map([
  ["S", [1, "small"]],
  ["M", [2, "medium"]],
  ["L", [3, "large"]],
  ["XL", [4, "xlarge"]],
  ["XXL", [5, "xxlarge"]],
])

const useBreakpoints = () => {
  const [currentBP, setCurrentBP] = useState([null, null])

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

  return { breakpoint: currentBP[0], breakpointName: currentBP[1] }
}

export default useBreakpoints
