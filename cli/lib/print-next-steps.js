import chalk from "chalk";
import log from "./log.js";

const printNextSteps = (dir) => {
  const cdInstruction = dir === "." ? "" : `\ncd ${dir} `;

  log("ok", "Project setup complete.");
  log(
    "msg",
    `\nTo get started, run: \n${cdInstruction}\nnvm use ${chalk.dim(
      "(if using nvm)"
    )} \nnpm install \nnpm start`
  );
};

export default printNextSteps;
