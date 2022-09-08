import { existsSync } from "fs";
import { mkdir, writeFile } from "fs/promises";

import { pascalToKebab } from "./utils.js";

const createLocales = (pageNames, locales = ["en"], localeTemplateUTF8) => {
  pageNames.forEach((name) => {
    const slug = pascalToKebab(name);
    const localeDir = `./src/locales/${slug}`;
    const localeContent = localeTemplateUTF8.replaceAll("PAGE_NAME", name);

    if (!existsSync(localeDir)) mkdir(localeDir);
    locales.forEach((loc) =>
      writeFile(`${localeDir}/${loc}.yml`, localeContent)
    );
  });
};

export default createLocales;
