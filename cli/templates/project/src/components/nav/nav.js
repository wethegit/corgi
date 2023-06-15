import { useEffect, useRef, useState } from "react"

import Link from "@local/components/link"
import ReducedMotionButton from "@local/components/reduced-motion-button/reduced-motion-button"
import SkipToButton from "@local/components/skip-to-button/skip-to-button"

import classnames from "@local/utils/classnames"

import * as styles from "./nav.module.scss"

import useLocale from "@local/hooks/use-locale"
import useBreakpoints from "@local/hooks/use-breakpoints"

const duration = 400

const Nav = ({}) => {
  const { globals, page } = useLocale()
  const [open, setOpen] = useState(false)
  const { breakpointIndex } = useBreakpoints()

  const toggle = () => setOpen(!open)

  useEffect(() => {
    if (breakpointIndex > 2) setOpen(false)
  }, [breakpointIndex])

  return (
    <div
      className={classnames(["bg-white", styles.navBar, open && styles.navActive])}
      style={{ "--duration": `${duration}ms` }}
    >
      <menu className={styles.a11yBar} aria-label={globals.nav.a11yOptions.label}>
        <li>
          <ReducedMotionButton />
        </li>
        <li>
          <SkipToButton
            anchor="#main-content"
            text={globals.nav.a11yOptions.skipToContent}
          />
        </li>
      </menu>

      {breakpointIndex < 3 && (
        <button
          className={classnames([styles.toggler, open && styles.togglerPressed])}
          aria-live="polite"
          onClick={() => toggle()}
        >
          <span className={styles.togglerIcon}></span>
          <span className="visually-hidden">
            {globals.nav.menu[open ? "close" : "open"]}
          </span>
        </button>
      )}

      <div className={styles.overlay} onClick={() => toggle()}></div>

      <nav
        className={styles.mainNav}
        aria-label={globals.nav.label}
      >
        <menu className={styles.navList} aria-expanded={open}>
          {globals.nav.items.map((item, i) => {
            const { label, path } = item
            return (
              <li
                key={`navitem${i}`}
                className={styles.navItem}
                aria-current={item.id === page?.selectedNav ? "page" : null}
              >
                <Link href={path} passHref>
                  <a onClick={() => setOpen(false)}>{label}</a>
                </Link>
              </li>
            )
          })}
        </menu>
      </nav>
    </div>
  )
}

export default Nav
