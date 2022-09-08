// TODO: This needs a refactor to _actually_ be synchronous.
// Currently it WORKS, but some sort of async iterator pattern would
// be ideal here, rather than "await" inside a while loop, lol.

import { existsSync } from "fs";

import prompt from "./prompt.js";
import { getQuestion, pascalToKebab } from "./utils.js";

// Checks if any of the supplied page names already exist
const checkExisting = async (dirNames, type) => {
  const names = [...dirNames];
  while (names.length) {
    const name = names.shift();
    const slug = pascalToKebab(name);
    if (existsSync(`${type.location}/${slug}`)) {
      const input = await prompt(
        getQuestion(`${type.id}-overwrite`)
          .replace(`%${type.id.toUpperCase()}_SLUG%`, slug)
          .replace(`%${type.id.toUpperCase()}_NAME%`, name)
      );
      if (input.trim() !== "y") process.exit();
    }
    checkExisting(names, type);
  }
};

export default checkExisting;
