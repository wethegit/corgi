import { mkdir, readFile, writeFile } from "fs/promises";
import fse from "fs-extra";
import path from "path";
import * as url from "url";

import CONSTS from "../../consts.js";

import mergeTemplateRepo from "../../lib/merge-template-repo.js";
import mergePkgProperties from "../../lib/merge-package-properties.js";
import prompt from "../../lib/prompt.js";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const { pathExistsSync, copySync } = fse;
let projectConfig = { ...CONSTS.CONFIG_DEFAULTS };

const getQuestion = (id) => CONSTS.QUESTIONS.find((q) => q.id === id).text;

const project = async (directory, options) => {
  let { template } = options;
  let customConfig = {};

  // Prompt the user to specify arguments if they haven't
  if (!directory) {
    try {
      directory = await prompt(getQuestion("directory"));
      if (!directory) directory = ".";
    } catch (err) {
      console.log(err);
    }
  }

  if (!template) {
    try {
      template = await prompt(getQuestion("template"));
    } catch (err) {
      console.log(err);
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
    customConfig = await mergeTemplateRepo({
      templateURL: template,
      destination: path.resolve(process.cwd(), directory),
    });

    projectConfig = { ...CONSTS.CONFIG_DEFAULTS, ...customConfig };
  }

  // Append config-specific NPM scripts and dependencies
  console.log("adding custom NPM dependencies and scripts…");
  const pkgFilePath = `${directory}/package.json`;
  try {
    const pkgFileParsed = JSON.parse(await readFile(pkgFilePath));
    const pkgContentsMerged = await mergePkgProperties({
      existing: pkgFileParsed,
      custom: projectConfig,
    });
    await writeFile(pkgFilePath, JSON.stringify(pkgContentsMerged, null, 2));
  } catch (err) {
    console.log(err);
  }
  console.log("done");
};

export default project;
