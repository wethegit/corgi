import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <h1 className="hero__title">{siteConfig.title}</h1>
        <p className="hero__subtitle">{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />
      <main>
        <ul className="margin-top--lg">
          <li className="margin-top--xs">
            Easy localization within static Next.js projects.
          </li>
          <li className="margin-top--xs">
            Full SCSS framework for layout, typography, and more.
          </li>
          <li className="margin-top--xs">
            Command line interface for quickly and easily setting up projects,
            pages, and components.
          </li>
        </ul>

        <Link className="button button--secondary button--lg" to="/docs/intro">
          Quick start tutorial - 5min ⏱️
        </Link>

        <img
          className="margin-top--lg"
          src="/img/cli-project.jpg"
          alt=""
          style={{ display: "block" }}
        />
      </main>
    </Layout>
  );
}
