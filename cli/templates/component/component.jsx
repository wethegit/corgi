import { useEffect, useState } from "react"

import { useLocale } from "@local/hooks"

import styles from "./COMPONENT_SLUG.module.scss"

export function COMPONENT_NAME({ ...props }) {
  const { globals, page } = useLocale()

  return (
    <div className={styles.wrap} {...props}>
      <code>COMPONENT_NAME</code>!
    </div>
  )
}