import { useEffect } from "react"

import { useLocale } from "@local/hooks"
import { classnames } from "@local/utils"
import localesConfig from "@local/config-locales"

import { BodyScripts, Footer, Nav, PageHead } from "./components"

import styles from "./page.module.scss"

export function Page({ children, className, version }) {
  const { locale, localeMap } = useLocale()

  useEffect(() => {
    const docLang = document.documentElement.lang
    let lang = locale
    if (localesConfig.langValue && localeMap[localesConfig.langValue])
      lang = localeMap[localesConfig.langValue] || locale
    if (docLang !== lang) document.documentElement.lang = lang
  }, [locale])

  useEffect(() => {
    console.log("VERSION:", version)
  }, [version])

  return (
    <>
      <PageHead />
      <div className={classnames([className, styles.layout])}>
        <Nav />
        <div id="main-content" className={styles.mainContent}>
          {children}
        </div>
        <Footer />
      </div>
      <BodyScripts />
    </>
  )
}
