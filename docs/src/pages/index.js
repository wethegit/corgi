import React from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import HomepageFeatures from "../components/HomepageFeatures";
import HomepageHeader from "../components/HomepageHeader";

import styles from "./index.module.css";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <HomepageHeader />

      <main>
        <HomepageFeatures />
        <Link className="button button--secondary button--lg" to="/docs/intro">
          Quick start tutorial
        </Link>
      </main>
    </Layout>
  );
}
