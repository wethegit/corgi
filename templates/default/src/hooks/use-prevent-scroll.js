import { useEffect } from "react"

const usePreventScroll = (state) => {
  useEffect(() => {
    if (state) document.body.style.overflow = "hidden"
    else document.body.style = ""
    return () => (document.body.style = "")
  }, [state])
}

export default usePreventScroll
