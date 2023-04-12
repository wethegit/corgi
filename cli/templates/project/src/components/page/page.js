import { useEffect } from "react";
import localesConfig from "../../config-locales";
import useLocale from "@local/hooks/use-locale";

import BodyScripts from "@local/components/body-scripts";
import Footer from "@local/components/footer/footer";
import Nav from "@local/components/nav/nav";
import PageHead from "@local/components/page-head";

import classnames from "@local/utils/classnames";

import * as styles from "./page.module.scss";

const Page = ({ children, className, version }) => {
  const { locale, localeMap } = useLocale();

  useEffect(() => {
    const docLang = document.documentElement.lang;
    let lang = locale;
    if (localesConfig.langValue && localeMap[localesConfig.langValue])
      lang = localeMap[localesConfig.langValue] || locale;
    if (docLang !== lang) document.documentElement.lang = lang;
  }, [locale]);

  useEffect(() => {
    console.log("VERSION:", version);
  }, [version]);

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
  );
};

export default Page;
