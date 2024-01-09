import { useEffect, useRef, useState } from "react"

import { Link } from "@local/components/common"
import { classnames } from "@local/utils"
import { useLocale } from "@local/hooks"

import { SkipToButton, ReducedMotionButton } from "./components"
import styles from "./nav.module.scss"

const DURATION = 400
const MAIN_NAV_ID = "main-site-nav"

export function Nav({ toggleable = false }) {
  const { globals, page } = useLocale()
  const [open, setOpen] = useState(false)
  const focusLoopEnd = useRef()
  const menuToggler = useRef()

  const toggle = () => setOpen(!open)

  // Close the menu when the togglablility changes
  useEffect(() => {
    if (!toggleable) setOpen(false)
  }, [toggleable])

  return (
    <div
      className={classnames(["bg-white", styles.navBar, open && styles.navActive])}
      style={{ "--duration": `${DURATION}ms` }}
    >
      <ul className={styles.a11yBar} aria-label={globals.nav.a11yOptions.label}>
        <li>
          <ReducedMotionButton />
        </li>
        <li>
          <SkipToButton
            anchor="#main-content"
            text={globals.nav.a11yOptions.skipToContent}
          />
        </li>
      </ul>

      {toggleable && (
        <button
          className={classnames([styles.toggler, open && styles.togglerPressed])}
          aria-live="polite"
          aria-expanded={open}
          aria-controls={MAIN_NAV_ID}
          ref={menuToggler}
          onClick={() => toggle()}
        >
          <span className={styles.togglerIcon}></span>
          <span className="visually-hidden">
            {globals.nav.menu[open ? "close" : "open"]}
          </span>
        </button>
      )}

      <div className={styles.overlay} onClick={() => toggle()}></div>

      <nav className={styles.mainNav} aria-label={globals.nav.label} id={MAIN_NAV_ID}>
        <ul className={styles.navList}>
          {globals.nav.items.map((item, i) => {
            const { label, path } = item
            return (
              <li
                key={`navitem${i}`}
                className={styles.navItem}
                aria-current={item.id === page?.selectedNav ? "page" : null}
              >
                <Link href={path} passHref onClick={() => setOpen(false)}>
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Focus loop trigger -> takes us back to the menu toggler when tabbing */}
        {toggleable && (
          <span
            className="visually-hidden"
            ref={focusLoopEnd}
            tabIndex={0}
            onFocus={() => menuToggler.current.focus()}
          />
        )}
      </nav>
    </div>
  )
}
