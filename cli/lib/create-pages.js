import { mkdir, writeFile } from "fs/promises";

import log from "./log.js"
import { pascalToKebab } from "./utils.js";

async function* makePages(pageNames, pageTemplateUTF8) {
  for (const name of pageNames) {
    const slug = pascalToKebab(name);
    const pageDir = `./src/pages/[locale]/${slug}`;

    const pageContent = pageTemplateUTF8
      .replaceAll("PAGE_SLUG", slug)
      .replaceAll("PAGE_NAME", name);

    await mkdir(pageDir, { recursive: true });
    writeFile(`${pageDir}/index.js`, pageContent);
    yield name;
  }
}

const createPages = async (pageNames, pageTemplateUTF8) => {
  for await (const page of makePages(pageNames, pageTemplateUTF8)) {
    log("ok", `${page}: created page component`)
  }
};

export default createPages;
