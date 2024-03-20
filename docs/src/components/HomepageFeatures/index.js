import React from "react";
import clsx from "clsx";
import CodeIcon from "@mui/icons-material/Code";
import LanguageIcon from "@mui/icons-material/Language";

import styles from "./styles.module.css";

const FEATURES = [
  ["Easy localization within static Next.js projects.", LanguageIcon],
  [
    "Command line interface for quickly and easily setting up projects, pages, and components.",
    CodeIcon,
  ],
];

export default function HomepageFeatures() {
  return (
    <ul className={clsx("row", styles.list)}>
      {FEATURES.map(([feature, icon], idx) => {
        const Icon = icon;
        return (
          <li key={idx} className={clsx("col col--4", styles.item)}>
            <div className={clsx("card", styles.card)}>
              <Icon className={clsx(styles.icon, "margin-top--md")} />
              <p className="card__body">{feature}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
