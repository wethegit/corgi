import { useEffect, useState } from "react"

import { useLocale } from "@local/hooks"
import { classnames } from "@local/utilities"

import styles from "./COMPONENT_SLUG.module.scss"

export function COMPONENT_NAME({ className, ...props }) {
  const { globals, page } = useLocale()

  return (
    <div className={classnames([styles.wrap, className])} {...props}>
      <code>COMPONENT_NAME</code>!
    </div>
  )
}