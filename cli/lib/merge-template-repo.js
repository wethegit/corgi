import { mkdir, rm } from "fs/promises";
import { exec } from "child_process";
import path from "path";
import mergedirs from "merge-dirs";

const TEMP_FOLDER_NAME = "corgi-temp";

const runShellCommand = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (err) => {
      if (err) reject(err);
      resolve();
    });
  });
};

const mergeTemplateRepo = async ({ templateURL, destination }) => {
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

  console.log("cloning template repo…");
  await runShellCommand(
    `git clone git@github.com:${user}/${repo}.git --branch ${branch.join(
      "/"
    )} ${TEMP_FOLDER_PATH}`
  );

  // remove .git/
  await rm(path.join(TEMP_FOLDER_PATH, ".git"), {
    recursive: true,
  });

  // merge template into project
  console.log("merging template…");
  mergedirs.default(TEMP_FOLDER_PATH, destination, "overwrite");

  // Clean up
  console.log("cleaning up…");
  await rm(TEMP_FOLDER_PATH, { recursive: true });
};

export default mergeTemplateRepo;
