import { readFile } from "fs/promises";
import path from "path";
import * as url from "url";

import handleNamingErrors, {
  NAME_TYPES,
} from "../../lib/handle-naming-errors.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

const component = async (names) => {
  handleNamingErrors(names, NAME_TYPES.COMPONENT);

  // TODO: Make the component!
};

export default component;
