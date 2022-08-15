import { readFile } from "fs/promises";
import { existsSync } from "fs";
import path from "path";

import CONSTS from "../../consts.js";

import cloneRepo from "../../lib/clone-repo.js";
import prompt from "../../lib/prompt.js";

let projectConfig = { ...CONSTS.CONFIG_DEFAULTS };

const newProject = async (directory, options) => {
  // Prompt the user to specify a project directory, if one wasn't provided.
  if (!directory) {
    try {
      directory = await prompt(
        CONSTS.QUESTIONS.find((q) => q.id === "directory").text
      );
    } catch (err) {
      console.log(err);
    }
  }

  // If there's a preexisting config file, we ensure those settings take priority.
  if (options.useConfig) {
    const configFilePath = path.resolve(directory, CONSTS.CONFIG_FILENAME);

    console.log(configFilePath);

    try {
      await existsSync(configFilePath);
      const parsed = JSON.parse(await readFile(configFilePath));
      projectConfig = { ...CONSTS.CONFIG_DEFAULTS, ...parsed };
    } catch {
      console.log(`⚠️  No config file found at ${configFilePath}.`);
      console.log("Proceed with the default Corgi configuration.");
    }
  }

  // Make the project.
  cloneRepo({
    templateURL: projectConfig.templateURL,
    destination: path.resolve(process.cwd(), directory),
  });
};

export default newProject;
