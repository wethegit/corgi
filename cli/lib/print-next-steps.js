import chalk from "chalk";
import log from "./log.js";

const printNextSteps = (dir, componentsList) => {
  const cdInstruction = dir === "." ? "" : `\ncd ${dir} `;

  log("ok", "Project setup complete.");

  let logMessage = `\nTo get started, run: \n${cdInstruction}\nnvm use ${chalk.dim(
    "(if using nvm)"
  )} \nnpm install`

  if (componentsList.length) {
    logMessage += ` \nLooks like this template requires components from @wethegit/component-library. \nAfter installing dependencies run: \nnpx @wethegit/components-cli init \nnpx @wethegit/components-cli add ${componentsList.join(' ')}`
  }

  logMessage += `\nnpm run dev`;
};

export default printNextSteps;
