import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

const FeatureList = [
  {
    title: "Testing testing, this thing still needs a name",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <>
        Names, man. How do <em>they</em> work?
      </>
    ),
  },
  {
    title: "i18n out of the box",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <>You can translate your project into one million languages.</>
    ),
  },
  {
    title: "Docs",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: <>Learn more in the docs, mmkay?</>,
  },
];

function Feature({ Svg, title, description }) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
