import useLocale from "#hooks/use-locale"

import { footer } from "./footer.module.scss"

const Footer = ({ children }) => {
  const { globals } = useLocale()

  return (
    <footer className={footer}>
      {children}
      {globals.footer.legal.map((txt, i) => (
        <p key={`footerlegal${i}`}>{txt}</p>
      ))}
    </footer>
  )
}

export default Footer
