import { useCallback, useEffect, useState } from "react"

const BREAKPOINT_MAP = new Map([
  ["S", 1],
  ["M", 2],
  ["L", 3],
  ["XL", 4],
  ["XXL", 5],
])

const useBreakpoints = () => {
  const [currentBP, setCurrentBP] = useState(null)

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

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  })

  useEffect(() => {
    handleResize()
  }, [handleResize])

  return currentBP
}

export default useBreakpoints
