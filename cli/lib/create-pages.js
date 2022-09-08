import { existsSync } from "fs";
import { mkdir, writeFile } from "fs/promises";

import { pascalToKebab } from "./utils.js";

const createPages = (pageNames, pageTemplateUTF8) => {
  pageNames.forEach(async (name) => {
    const slug = pascalToKebab(name);
    const pageDir = `./src/pages/[locale]/${slug}`;

    const pageContent = pageTemplateUTF8
      .replaceAll("PAGE_SLUG", slug)
      .replaceAll("PAGE_NAME", name);

    if (!existsSync(pageDir)) await mkdir(pageDir);
    writeFile(`${pageDir}/index.js`, pageContent);
  });
};

export default createPages;
