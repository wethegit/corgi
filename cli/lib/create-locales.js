import { mkdir, writeFile } from "fs/promises";

import log from "./log.js"
import { pascalToKebab } from "./utils.js";

async function* makeLocaleFiles(pageNames, locales, localeTemplateUTF8) {
  for (const input of pageNames) {
    // account for the page being in a sub-directory:
    const parts = input.split("/");
    const name = parts.pop();
    const slug = pascalToKebab(name);
    const subDirectory = parts.join("/");

    const localeDir = `./src/locales/${subDirectory ? subDirectory + "/" : ""}${slug}`;

    const localeContent = localeTemplateUTF8.replaceAll("PAGE_NAME", name);

    await mkdir(localeDir, { recursive: true });
    locales.forEach((loc) =>
      writeFile(`${localeDir}/${loc}.yml`, localeContent)
    );
    yield name;
  }
}

const createLocales = async (pageNames, locales = ["en"], localeTemplateUTF8) => {
  for await (const page of makeLocaleFiles(pageNames, locales, localeTemplateUTF8)) {
    log("ok", `${page}: created locale data`)
  }
};

export default createLocales;




