import { copy } from "fs-extra";
import { mkdir, rm } from "fs/promises";
import { existsSync } from "fs";
import { exec } from "child_process";

const TEMP_FOLDER = "corgi-temp";

const runCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
};

const cloneRepo = async ({ templateURL, destination }) => {
  const dirExists = await existsSync(destination);
  if (!dirExists) await mkdir(destination);
  await mkdir(TEMP_FOLDER);

  // - parse the github URL passed; clone the repo/branch
  const url = new URL(templateURL);

  if (url.origin !== "https://github.com")
    throw new Error(
      "Invalid templateURL. Must be a URL pointing to a branch of a Github repo."
    );

  const [user, repo, _, branch] = url.toString().split("/").slice(3);

  await runCommand(
    `git clone git@github.com:${user}/${repo}.git --branch ${branch} ${TEMP_FOLDER}`
  );

  // move contens of `TEMP_FOLDER` into `destination`
  await copy(TEMP_FOLDER, destination);
  rm(TEMP_FOLDER, { recursive: true, force: true });

  console.log("done!");
};

export default cloneRepo;
