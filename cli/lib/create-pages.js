import { mkdir, writeFile } from "fs/promises";

import log from "./log.js"
import { assembleDirectoryPath } from "./utils.js"

async function* makePages(pageNames, pageTemplateUTF8) {
  for (const input of pageNames) {
    const { name, slug, directory, subDirectory } = assembleDirectoryPath({
      pathToDir: "./src/pages/[locale]",
      inputName: input,
    })

    const pageContent = pageTemplateUTF8
      .replaceAll("PAGE_SLUG", `${subDirectory ? subDirectory + "/" : ""}${slug}`)
      .replaceAll("PAGE_NAME", name);

    await mkdir(directory, { recursive: true });
    writeFile(`${directory}/index.js`, pageContent);
    yield name;
  }
}

const createPages = async (pageNames, pageTemplateUTF8) => {
  for await (const page of makePages(pageNames, pageTemplateUTF8)) {
    log("ok", `${page}: created page component`)
  }
};

export default createPages;
