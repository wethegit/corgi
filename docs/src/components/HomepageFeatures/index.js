import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";

const FEATURES = [
  "Easy localization within static Next.js projects.",
  "Full SCSS framework for layout, typography, and more.",
  "Command line interface for quickly and easily setting up projects, pages, and components.",
];

export default function HomepageFeatures() {
  return (
    <ul className={clsx("row", styles.list)}>
      {FEATURES.map((feature, idx) => (
        <ii key={idx} className="col col--4">
          <div className={clsx("card", styles.card)}>
            <p className="card__body">{feature}</p>
          </div>
        </ii>
      ))}
    </ul>
  );
}
