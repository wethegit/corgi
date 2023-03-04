import { mkdir, writeFile } from "fs/promises";

import log from "./log.js";
import {pascalToKebab} from "./utils.js"

async function* makeComponents(names, template, stylesheet) {
  for (const input of names) {
    // account for the component being in a sub-directory:
    const parts = input.split("/");
    const name = parts.pop();
    const slug = pascalToKebab(name);
    const subDirectory = parts.join("/");

    const directory = `./src/components/${subDirectory ? subDirectory + "/" : ""}${slug}`;

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