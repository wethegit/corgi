import { skipTo } from "./skip-to-button.module.scss"
import useLocale from "#hooks/use-locale"

import classnames from "#utils/classnames"

const SkipToButton = ({ anchor, text, className }) => {
  if (anchor.indexOf("#") !== 0) {
    console.warn(`anchor prop must be a valid HTML ID anchor (#example)`)
  }

  return (
    <a className={classnames([skipTo, className])} href={anchor}>
      {text || "Skip to main content"}
    </a>
  )
}

export default SkipToButton
