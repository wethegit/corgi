import { copy } from "fs-extra";
import { mkdir, readdir, rm } from "fs/promises";
import { existsSync } from "fs";
import { exec } from "child_process";

const TEMP_FOLDER = "corgi-temp";

const runShellCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
};

const mergeTemplateRepo = async ({ templateURL, destination }) => {
  const dirExists = await existsSync(destination);
  if (!dirExists) await mkdir(destination);
  await mkdir(TEMP_FOLDER);

  // - parse the github URL passed; clone the repo/branch
  const url = new URL(templateURL);

  if (url.origin !== "https://github.com")
    throw new Error(
      "Invalid templateURL. Must be a URL pointing to a branch of a Github repo."
    );

  // branch name uses rest operator here since branch names may contain slashes
  const [user, repo, _, ...branch] = url.toString().split("/").slice(3);

  await runShellCommand(
    `git clone git@github.com:${user}/${repo}.git --branch ${branch.join("/")} ${TEMP_FOLDER}`
  );

  // // move contens of `TEMP_FOLDER` into `destination`
  const contents = await readdir(TEMP_FOLDER)
  console.log(contents)

  await copy(TEMP_FOLDER, destination);
  rm(TEMP_FOLDER, { recursive: true, force: true });

  console.log("done!");
};

export default mergeTemplateRepo;
