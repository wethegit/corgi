import { readFile } from "fs/promises";
import path from "path";
import * as url from "url";

import checkPageNames from "../../lib/check-page-names.js";
import createLocales from "../../lib/create-locales.js";
import createPages from "../../lib/create-pages.js";
import log from "../../lib/log.js";
import prompt from "../../lib/prompt.js";
import { getQuestion } from "../../lib/utils.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const invalidNameError = new Error(
  "Page component name cannot include spaces or dashes. Try MyComponentName instead."
);

const page = async (names, options) => {
  const { locales } = options;

  // Check if invalid component names were provided (i.e. containing dashes)
  //
  // This error handling only applies to names passed to the command directly —
  // subsequent user input based on the CLI prompt is handled in a different block, below this.
  try {
    if (names.length && names.some((name) => name.includes("-")))
      throw invalidNameError;
  } catch (err) {
    log("err", err);
  }

  // Prompt the user to specify a page name, if they haven't
  if (!names.length) {
    try {
      const input = await prompt(getQuestion("page"));
      if (input.includes("-") || input.includes(" ")) throw invalidNameError;
      names.push(input);
    } catch (err) {
      log("err", err);
    }
  }

  // Make sure the user intends to overwrite any existing pages
  await checkPageNames(names);

  // Bootstrap all necessary page files, based on the Corgi page and locale templates
  const pageTemplate = await readFile(
    path.join(__dirname, "../../templates/page.js"),
    { encoding: "utf8" }
  );
  const localeTemplate = await readFile(
    path.join(__dirname, "../../templates/locale.yml"),
    { encoding: "utf8" }
  );
  createPages(names, pageTemplate);
  createLocales(names, locales, localeTemplate);
};

export default page;
