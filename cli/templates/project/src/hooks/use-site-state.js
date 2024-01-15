import { useContext } from "react"

import { SiteStateContext } from "@local/context"

export function useSiteState() {
  const context = useContext(SiteStateContext)

  if (context === undefined) {
    throw new Error("useSiteState must be used within a SiteStateProvider")
  }

  return context
}
