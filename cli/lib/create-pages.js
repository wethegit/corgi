import { mkdir, writeFile } from "fs/promises";

import log from "./log.js"
import { pascalToKebab } from "./utils.js";

async function* makePages(pageNames, pageTemplateUTF8) {
  for (const input of pageNames) {
    // account for the page being in a sub-directory:
    const parts = input.split("/")
    const name = parts.pop()
    const slug = pascalToKebab(name);
    const subDirectory = parts.join("/");

    const pageDir = `./src/pages/[locale]/${subDirectory ? subDirectory + "/" : ""}${slug}`;

    const pageContent = pageTemplateUTF8
      .replaceAll("PAGE_SLUG", `${subDirectory ? subDirectory + "/" : ""}${slug}`)
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
