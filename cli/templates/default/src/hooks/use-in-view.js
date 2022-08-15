import { useState, useRef, useEffect, useCallback } from "react"

const useInView = (threshold = 0.3, once = true) => {
  const [isIntersecting, setIntersecting] = useState(false)
  const [targetRef, setTargetRef] = useState(null)
  const observerRef = useRef(null)
  const optionsRef = useRef(typeof threshold === "number" ? { threshold } : threshold)

  const observerCallback = useCallback(
    ([entry], observer) => {
      const isVisible = entry.isIntersecting
      setIntersecting(isVisible)
      if (once && isVisible) observer.unobserve(entry.target)
    },
    [once]
  )

  useEffect(() => {
    if (observerRef.current) return

    if (!targetRef) return

    observerRef.current = new IntersectionObserver(observerCallback, optionsRef.current)
    observerRef.current.observe(targetRef)

    return () => {
      if (observerRef.current) observerRef.current.unobserve(targetRef)
    }
  }, [observerCallback, targetRef])

  return [setTargetRef, isIntersecting, targetRef]
}

export default useInView
