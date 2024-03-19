import { useEffect, useState } from "react"

import { useLocale } from "@local/hooks"

export function COMPONENT_NAME({ ...props }) {
  const { globals, page } = useLocale()

  return (
    <div {...props}>
      <code>COMPONENT_NAME</code>!
    </div>
  )
}