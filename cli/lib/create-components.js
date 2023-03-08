import { mkdir, writeFile } from "fs/promises";

import log from "./log.js";
import { assembleDirectoryPath } from "./utils.js"

async function* makeComponents(names, template, stylesheet) {
  for (const input of names) {
    const { name, slug, directory } = assembleDirectoryPath({
      pathToDir: "./src/components",
      inputName: input,
    })

    const componentContent = template
      .replaceAll("COMPONENT_SLUG", slug)
      .replaceAll("COMPONENT_NAME", name);

    await mkdir(directory, { recursive: true });
    await writeFile(`${directory}/${slug}.js`, componentContent);
    await writeFile(`${directory}/${slug}.module.scss`, stylesheet);

    yield name;
  }
}

const createComponents = async (names, template, stylesheet) => {
  for await (const component of makeComponents(names, template, stylesheet)) {
    log("ok", `${component}: created component`)
  }
}

export default createComponents