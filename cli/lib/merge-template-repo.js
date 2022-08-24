import { mkdir, readFile, rm } from "fs/promises";
import fse from "fs-extra";
import { exec } from "child_process";
import path from "path";
import mergedirs from "merge-dirs";
import chalk from "chalk";

import log, { killSpinner } from "./log.js";
import CONSTS from "../consts.js";

const TEMP_FOLDER_NAME = "corgi-temp";
const { pathExistsSync } = fse;

const runShellCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
};

/**
 * @param {Object} options
 * @param {Object} [options.templateURL] - Github branch URL containing a Corgi template
 * @param {Object} [options.destination] - Directory to clone template into.
 * @param {Object} [options.spinnerInstance] - If there's an existing spinner, pass it here so we can cancel it if need be.
 * @returns {Object} - custom template configuration object, per the repo. Defaults to {}.
 */
const mergeTemplateRepo = async ({
  templateURL,
  destination,
  spinnerInstance,
}) => {
  let templateConfig = {};
  const TEMP_FOLDER_PATH = path.resolve(destination, TEMP_FOLDER_NAME);

  await mkdir(TEMP_FOLDER_PATH);

  // parse the github URL passed; clone the repo/branch
  const url = new URL(templateURL);

  if (url.origin !== "https://github.com")
    throw new Error(
      "Invalid templateURL. Must be a URL pointing to a branch of a Github repo."
    );

  // branch name uses "rest" here since branch names may contain slashes
  const [user, repo, _, ...branch] = url.toString().split("/").slice(3);

  await runShellCommand(
    `git clone git@github.com:${user}/${repo}.git --branch ${branch.join(
      "/"
    )} ${TEMP_FOLDER_PATH}`
  );

  // Grab any config overrides from the template
  const configFilePath = path.resolve(TEMP_FOLDER_PATH, CONSTS.CONFIG_FILENAME);
  try {
    await pathExistsSync(configFilePath);
    templateConfig = JSON.parse(await readFile(configFilePath));
  } catch (err) {
    if (spinnerInstance) killSpinner(spinnerInstance);
    log(
      "warn",
      `No config file found at ${chalk.dim(
        configFilePath
      )}.\nProceeding with the default Corgi configuration.`
    );
  }

  // remove .git/
  await rm(path.join(TEMP_FOLDER_PATH, ".git"), {
    recursive: true,
  });

  // merge template into project
  mergedirs.default(TEMP_FOLDER_PATH, destination, "overwrite");

  // Clean up temporary folder
  await rm(TEMP_FOLDER_PATH, { recursive: true });

  return templateConfig;
};

export default mergeTemplateRepo;
