import { useLocale } from "@local/hooks"

import styles from "./footer.module.scss"

export function Footer({ children }) {
  const { globals } = useLocale()

  return (
    <footer className={styles.footer}>
      {children}
      {globals.footer.legal.map((txt, i) => (
        <p key={`footerlegal${i}`}>{txt}</p>
      ))}
    </footer>
  )
}