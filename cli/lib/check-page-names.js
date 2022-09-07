import fse from "fs-extra";

import prompt from "./prompt.js";
import { getQuestion, pascalToKebab } from "./utils.js";

const { pathExistsSync } = fse;

// Checks if any of the supplied page names already exist
const checkPageNames = async (pageNames) => {
  const names = [...pageNames];
  while (names.length) {
    const name = names.shift();
    const slug = pascalToKebab(name);
    if (pathExistsSync(`./src/pages/[locale]/${slug}`)) {
      const input = await prompt(
        getQuestion("page-overwrite")
          .replace("%PAGE_SLUG%", slug)
          .replace("%PAGE_NAME%", name)
      );
      if (input.trim() !== "y") process.exit();
    }
    checkPageNames(names);
  }
};

export default checkPageNames;
