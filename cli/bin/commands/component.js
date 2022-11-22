import { readFile } from "fs/promises";
import path from "path";
import * as url from "url";

import createComponents from "../../lib/create-components.js";
import handleNamingErrors, {
  NAME_TYPES,
} from "../../lib/handle-naming-errors.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const component = async (names) => {
  await handleNamingErrors(names, NAME_TYPES.COMPONENT);

  // Bootstrap all necessary component files, based on the corgi templates
  const template = await readFile(
    path.join(__dirname, "../../templates/component/component.js"),
    { encoding: "utf8" }
  );
  const stylesheet = await readFile(
    path.join(__dirname, "../../templates/component/component.module.scss"),
    { encoding: "utf8" }
  );

  await createComponents(names, template, stylesheet);
};

export default component;
