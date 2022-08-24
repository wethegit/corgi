import { mkdir, readFile, writeFile } from "fs/promises";
import fse from "fs-extra";
import path from "path";
import * as url from "url";
import chalk from "chalk";

import CONSTS from "../../consts.js";

import mergeTemplateRepo from "../../lib/merge-template-repo.js";
import mergePkgProperties from "../../lib/merge-package-properties.js";
import prompt from "../../lib/prompt.js";
import log, { killSpinner } from "../../lib/log.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const { pathExistsSync, copySync } = fse;
let projectConfig = { ...CONSTS.CONFIG_DEFAULTS };
let usedCustomConfig = false;

const getQuestion = (id) => CONSTS.QUESTIONS.find((q) => q.id === id).text;

const printNextSteps = (dir) => {
  log("ok", "Project setup complete.");
  log(
    "msg",
    `\nTo get started, run: \n\ncd ${dir} \nnvm use ${chalk.dim(
      "(if using nvm)"
    )} \nnpm install \nnpm start`
  );
};

const project = async (directory, options) => {
  let { template } = options;
  let customConfig = {};

  // Prompt the user to specify arguments if they haven't
  if (!directory) {
    try {
      directory = await prompt(getQuestion("directory"));
      if (!directory) directory = "./";
    } catch (err) {
      log("err", err);
    }
  }

  if (!template) {
    try {
      template = await prompt(getQuestion("template"));
    } catch (err) {
      log("err", err);
    }
  }

  // create the directory if needed
  if (!pathExistsSync(directory)) await mkdir(directory);

  // Grab the default boilerplate.
  // Any external templates will extend this (not replace it).
  const boilerplate = path.join(__dirname, "../../template");
  await copySync(boilerplate, directory);

  // Grab optional custom template
  if (template) {
    const repoSpinner = log("msg", "Retrieving template repo…", true);

    customConfig = await mergeTemplateRepo({
      templateURL: template,
      destination: path.resolve(process.cwd(), directory),
      spinnerInstance: repoSpinner,
    });

    killSpinner(repoSpinner);
    log("ok", "Retrieved!");

    if (Object.keys(customConfig).length) usedCustomConfig = true;
    projectConfig = { ...CONSTS.CONFIG_DEFAULTS, ...customConfig };
  }

  // Append config-specific NPM scripts and dependencies
  if (usedCustomConfig) {
    const configSpinner = log("msg", "Adding custom config…", true);
    const pkgFilePath = `${directory}/package.json`;
    try {
      const pkgFileParsed = JSON.parse(await readFile(pkgFilePath));
      const pkgContentsMerged = await mergePkgProperties({
        existing: pkgFileParsed,
        custom: projectConfig,
      });
      await writeFile(pkgFilePath, JSON.stringify(pkgContentsMerged, null, 2));
    } catch (err) {
      killSpinner(configSpinner);
      log("err", err);
    }
    killSpinner(configSpinner);
    log("ok", "Added!");
  }

  printNextSteps(directory);
};

export default project;
