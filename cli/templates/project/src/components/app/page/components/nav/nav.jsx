import { Fragment, useEffect, useRef, useState } from "react"
import { CSSTransition } from "react-transition-group"

import { Link } from "@local/components"
import { classnames } from "@local/utils"
import { useLocale, useBreakpoints } from "@local/hooks"

import { SkipToButton, ReducedMotionButton } from "./components"

import styles from "./nav.module.scss"
import transitionStyles from "./nav-transition.module.scss"

const DURATION = 400

export function Nav() {
  const { globals, page } = useLocale()
  const [open, setOpen] = useState(false)
  const { breakpointIndex } = useBreakpoints()

  // This ref is just to avoid the "findDOMNode in strictMode" error:
  // https://github.com/reactjs/react-transition-group/issues/668
  const transitionRef = useRef()

  const toggle = () => setOpen(!open)

  useEffect(() => {
    if (breakpointIndex > 2) setOpen(false)
  }, [breakpointIndex])

  return (
    <div
      className={classnames(["bg-white", styles.navBar, open && styles.navActive])}
      style={{ "--duration": `${DURATION}ms` }}
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

      {(() => {
        {/* This is just some logic to wrap our navigation in either a <CSSTransition>
        or a React Fragment. The reason being that we don't want any transitions on it
        for the desktop experience (i.e. breakpointIndex > 2) */}

        const WrapperTag = breakpointIndex > 2 ? Fragment : CSSTransition
        const wrapperProps =
          breakpointIndex > 2
            ? {}
            : {
                classNames: transitionStyles,
                in: open,
                timeout: DURATION,
                unmountOnExit: true,
                nodeRef: transitionRef,
              }

        return (
          <WrapperTag {...wrapperProps}>
            <nav
              className={styles.mainNav}
              aria-label={globals.nav.label}
              ref={transitionRef}
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
          </WrapperTag>
        )
      })()}
    </div>
  )
}