import checkExisting from "./check-existing.js";
import log from "./log.js";
import prompt from "./prompt.js";
import { getQuestion } from "./utils.js";

export const NAME_TYPES = {
  PAGE: {
    id: "page",
    location: `./src/pages/[locale]`,
  },
  COMPONENT: {
    id: "component",
    location: `./src/components`,
  },
};

// If the user passes a path to a nested component, we just want the component name:
const isolateComponentName = name => name.split("/").pop()

const handleNamingErrors = async (names, type) => {
  const invalidNameError = (name) => {
    const pieces = name.split("-");
    const PascalCased = pieces
      .map((piece) =>
        [[...piece].shift().toUpperCase(), piece.slice(1)].join("")
      )
      .join("");

    return new Error(
      `${
        type.id === "page" ? "Page " : ""
      }Component name cannot include spaces or dashes, and its first letter must be uppercase.\nTry ${PascalCased} instead.`
    );
  };

  // Check if invalid component names were provided (i.e. containing dashes).
  // This block only applies to names passed to the command directly — subsequent
  // user input based on the CLI prompt is handled in a different block, below this.
  try {
    if (names.length) {
      names.forEach((name) => {
        if (isolateComponentName(name).includes("-")) throw invalidNameError(name);
      });
    }
  } catch (err) {
    log("err", err);
    process.exit();
  }

  // Prompt the user to specify a name, if they haven't
  if (!names.length) {
    try {
      const input = await prompt(getQuestion(type.id));
      const name = isolateComponentName(input)
      if (name.includes("-") || name.includes(" "))
        throw invalidNameError(name);
      names.push(name);
    } catch (err) {
      log("err", err);
      process.exit();
    }
  }

  // Make sure the user intends to overwrite any existing pages
  await checkExisting(names, type);
};

export default handleNamingErrors;
