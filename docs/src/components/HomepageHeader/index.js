import React from "react";
import clsx from "clsx";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Link from "@docusaurus/Link";

import styles from "./styles.module.css";

import Logo from "@site/static/img/corgi.svg";

export default function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--dark", styles.heroBanner)}>
      <div className="container">
        <h1 className={clsx("hero__title", styles.title)}>
          <Logo title="" className={styles.logo} />
          <span>{siteConfig.title}</span>
        </h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>

        <Link
          className="button button--secondary button--lg"
          to="/docs/category/quick-start"
        >
          Quick start tutorial
        </Link>
      </div>
    </header>
  );
}
