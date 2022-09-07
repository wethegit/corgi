import { mkdir, writeFile } from "fs/promises";

import log from "./log.js";
import { pascalToKebab } from "./utils.js";

const createPages = async (pageNames, template_utf8) => {
  const names = [...pageNames];
  while (names.length) {
    const name = names.shift();
    const slug = pascalToKebab(name);
    const pageContent = template_utf8
      .replaceAll("PAGE_SLUG", slug)
      .replaceAll("PAGE_NAME", name);
    const pageDir = `./src/pages/[locale]/${slug}`;
    try {
      await mkdir(pageDir);
      await writeFile(`${pageDir}/index.js`, pageContent);
    } catch (err) {
      log("err", err);
    }

    createPages(names);
  }
};

export default createPages;
