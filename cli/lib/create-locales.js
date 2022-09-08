import { mkdir, writeFile } from "fs/promises";

import log from "./log.js"
import { pascalToKebab } from "./utils.js";

async function* makeLocaleFiles(pageNames, locales, localeTemplateUTF8) {
  for (const name of pageNames) {
    const slug = pascalToKebab(name);
    const localeDir = `./src/locales/${slug}`;
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




