import { classnames } from "@local/utils"

import styles from "./skip-to-button.module.scss"

export function SkipToButton({ anchor, text, className }) {
  if (anchor.indexOf("#") !== 0) {
    console.warn(`anchor prop must be a valid HTML ID anchor (#example)`)
  }

  return (
    <a className={classnames([styles.skipTo, className])} href={anchor}>
      {text || "Skip to main content"}
    </a>
  )
}
