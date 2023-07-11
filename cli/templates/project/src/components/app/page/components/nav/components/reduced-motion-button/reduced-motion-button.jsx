import { useUserPrefs } from "@wethegit/react-hooks"

import { useLocale } from "@local/hooks"
import { classnames, castToBool } from "@local/utils"

import styles from "./reduced-motion-button.module.scss"

export function ReducedMotionButton() {
  const { globals } = useLocale()
  const { prefersReducedMotion, togglePrefersReducedMotion } = useUserPrefs()

  return (
    <button
      className={classnames([
        styles.rmButton,
        castToBool(prefersReducedMotion) && styles.rmButtonSelected,
      ])}
      onClick={() => togglePrefersReducedMotion()}
    >
      <span className={styles.rmButtonIcon}></span>
      <span className={styles.rmButtonLabel}>
        {globals.nav.a11yOptions.reducedMotion}
      </span>
    </button>
  )
}
