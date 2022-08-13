import { mkdir } from "fs/promises";
import path from "path";
import shell from "shelljs";
import fileExists from "../lib/file-exists.js";

const TEMP_FOLDER = "corgi-temp";

const cloneRepo = async ({ templateURL, destination }) => {
  const dirExists = await fileExists(destination);
  if (!dirExists) await mkdir(destination);
  await mkdir(TEMP_FOLDER);

  // - parse the github URL passed; clone the repo/branch
  const url = new URL(templateURL);

  if (url.origin !== "https://github.com")
    throw new Error(
      "Invalid templateURL. Must be a URL pointing to a branch of a Github repo."
    );

  const [user, repo, _, branch] = url.toString().split("/").slice(3);
  shell.exec(
    `git clone git@github.com:${user}/${repo}.git --branch ${branch} ${TEMP_FOLDER}`
  );

  // TODO:
  // move contens of `TEMP_FOLDER` into `destination`
};

export default cloneRepo;
