import { Fragment, useEffect, useRef, useState } from "react"
import { CSSTransition } from "react-transition-group"

import { Link } from "@local/components/common"
import { classnames } from "@local/utils"
import { useLocale, useBreakpoints } from "@local/hooks"

import { SkipToButton, ReducedMotionButton } from "./components"

import styles from "./nav.module.scss"
import transitionStyles from "./nav-transition.module.scss"

const DURATION = 400

export function Nav() {
  const { globals, page } = useLocale()
  const [open, setOpen] = useState(false)
  const { breakpointName, mediumDown } = useBreakpoints()
  const focusLoopEnd = useRef()
  const menuToggler = useRef()
  const isToggleableMenu = mediumDown
  
  // This ref is just to avoid the "findDOMNode in strictMode" error:
  // https://github.com/reactjs/react-transition-group/issues/668
  const transitionRef = useRef()

  const toggle = () => setOpen(!open)

  // close the menu when the breakpoint changes.
  useEffect(() => {
    if (!isToggleableMenu) setOpen(false)
  }, [breakpointName])

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

      {isToggleableMenu && (
        <button
          className={classnames([styles.toggler, open && styles.togglerPressed])}
          aria-live="polite"
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

      {(() => {
        {/* This is just some logic to wrap our navigation in either a <CSSTransition>
        or a React Fragment. The reason being that we don't want any transitions on it
        for the desktop experience (i.e. `!isToggleableMenu`) */}

        const WrapperTag = isToggleableMenu ? CSSTransition : Fragment
        const wrapperProps = 
          isToggleableMenu
            ? {
                classNames: navTransition,
                in: open,
                timeout: DURATION,
                unmountOnExit: true,
                nodeRef: transitionRef,
              }
            : {}

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

              {/* Focus loop trigger -> takes us back to the menu toggler when tabbing */}
              {isToggleableMenu && (
                <span
                  className="visually-hidden"
                  ref={focusLoopEnd}
                  tabIndex={0}
                  onFocus={() => menuToggler.current.focus()}
                />
              )}
            </nav>
          </WrapperTag>
        )
      })()}
    </div>
  )
}