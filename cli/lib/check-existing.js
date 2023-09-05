import { existsSync } from "fs";

import log from "./log.js"
import prompt from "./prompt.js";
import { getQuestion, makeKebabCase } from "./utils.js";

// Async iterator lets us wait for the user's input on each question
async function* askQuestions(dirNames, type) {
  for (const name of dirNames) {
    const slug = makeKebabCase(name);

    if (existsSync(`${type.location}/${slug}`)) {
      const input = await prompt(
        getQuestion(`${type.id}-overwrite`)
          .replace(`%${type.id.toUpperCase()}_SLUG%`, slug)
          .replace(`%${type.id.toUpperCase()}_NAME%`, name)
      );
      
      yield { name, input }
    }
  }
}

// Checks if any of the supplied page names already exist
const checkExisting = async (dirNames, type) => {
  const questionIterator = askQuestions(dirNames, type);

  for await (const answer of questionIterator) {
    if (answer.input.trim() !== "y") log("msg", `Skipping ${answer.name}…`)
    else log("msg", `Overwriting ${answer.name}…`)
  }
};

export default checkExisting;
