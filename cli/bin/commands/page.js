import { readFile } from "fs/promises";
import path from "path";
import * as url from "url";

import createLocales from "../../lib/create-locales.js";
import createPages from "../../lib/create-pages.js";
import handleNamingErrors, {
  NAME_TYPES,
} from "../../lib/handle-naming-errors.js";
import log from "../../lib/log.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const page = async (names, options) => {
  const { locales } = options;

  await handleNamingErrors(names, NAME_TYPES.PAGE);

  // Bootstrap all necessary page files, based on the corgi page and locale templates
  const pageTemplate = await readFile(
    path.join(__dirname, "../../templates/page.js"),
    { encoding: "utf8" }
  );
  const localeTemplate = await readFile(
    path.join(__dirname, "../../templates/locale.yml"),
    { encoding: "utf8" }
  );

  Promise.all([
    createPages(names, pageTemplate),
    createLocales(names, locales, localeTemplate),
  ]);
};

export default page;
