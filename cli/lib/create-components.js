import { mkdir, writeFile } from "fs/promises";

import log from "./log.js";
import { assembleDirectoryPath } from "./utils.js"

async function* makeComponents(names, template, stylesheet, indexFile) {
  for (const input of names) {
    const { name, slug, directory } = assembleDirectoryPath({
      pathToDir: "./src/components",
      inputName: input,
    })

    const componentContent = template
      .replaceAll("COMPONENT_SLUG", slug)
      .replaceAll("COMPONENT_NAME", name);

    const indexFileContent = indexFile
      .replaceAll("COMPONENT_SLUG", slug)
      .replaceAll("COMPONENT_NAME", name);

    await mkdir(directory, { recursive: true });
    await writeFile(`${directory}/${slug}.jsx`, componentContent);
    await writeFile(`${directory}/${slug}.module.scss`, stylesheet);
    await writeFile(`${directory}/index.js`, indexFileContent);

    yield name;
  }
}

const createComponents = async (names, template, stylesheet, indexFile) => {
  for await (const component of makeComponents(names, template, stylesheet, indexFile)) {
    log("ok", `${component}: created component`)
  }
}

export default createComponents