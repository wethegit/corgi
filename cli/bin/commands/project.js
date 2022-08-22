import { readdir, readFile } from "fs/promises";
import fse from "fs-extra";
import path from "path";
import * as url from "url";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

import CONSTS from "../../consts.js";

import mergeTemplateRepo from "../../lib/merge-template-repo.js";
import prompt from "../../lib/prompt.js";

const { pathExistsSync, copy } = fse;

let projectConfig = { ...CONSTS.CONFIG_DEFAULTS };

const project = async (directory, options) => {
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

  // If there's a preexisting config file, ensure those settings take priority
  if (options.useConfig) {
    const configFilePath = path.resolve(directory, CONSTS.CONFIG_FILENAME);

    try {
      await pathExistsSync(configFilePath);
      const parsed = JSON.parse(await readFile(configFilePath));
      projectConfig = { ...CONSTS.CONFIG_DEFAULTS, ...parsed };
    } catch {
      console.log(`⚠️  No config file found at ${configFilePath}.`);
      console.log("Proceeding with the default Corgi configuration.");
    }
  }

  // Grab the default, barebones template.
  // Any external templates should _extend_ this, not replace it.
  // const defaultTemplate = path.join(__dirname, "../../template")
  // copy(defaultTemplate, directory)

  // Grab optional custom template from the config
  // if (projectConfig.templateURL) {
  //   mergeTemplateRepo({
  //     templateURL: projectConfig.templateURL,
  //     destination: path.resolve(process.cwd(), directory),
  //   });
  // }
};

export default project;
