import { useContext } from "react"
import { SiteStateContext } from "@local/context/site-state-context"

const useSiteState = () => useContext(SiteStateContext)

export default useSiteState
