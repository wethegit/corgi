import { mkdir, writeFile } from "fs/promises";

import log from "./log.js"
import { assembleDirectoryPath } from "./utils.js"

async function* makeLocaleFiles(pageNames, locales, localeTemplateUTF8) {
  for (const input of pageNames) {
    const { name, directory } = assembleDirectoryPath({
      pathToDir: "./src/locales",
      inputName: input,
    })

    const localeContent = localeTemplateUTF8.replaceAll("PAGE_NAME", name);

    await mkdir(directory, { recursive: true });
    locales.forEach((loc) =>
      writeFile(`${directory}/${loc}.yml`, localeContent)
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




