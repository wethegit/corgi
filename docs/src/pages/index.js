import React from "react";

import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

import HomepageFeatures from "../components/HomepageFeatures";
import HomepageHeader from "../components/HomepageHeader";

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
        <div style={{ textAlign: "center", marginBottom: "4em" }}>
          <Link className="button button--primary button--lg " to="/docs/intro">
            Read the docs
          </Link>
        </div>
      </main>
    </Layout>
  );
}
