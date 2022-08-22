import { useContext } from "react"
import { SiteStateContext } from "../context/site-state-context"

const useSiteState = () => useContext(SiteStateContext)

export default useSiteState
