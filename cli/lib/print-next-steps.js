import chalk from "chalk";

import log from "./log.js";

const printNextSteps = (dir, componentsList) => {
  const cdInstruction = dir === "." ? "" : `\ncd ${dir} `;

  log("ok", "Project setup complete.");

  let logMessage = `\nTo get started, run: \n- ${cdInstruction}\n- nvm use ${chalk.dim(
    "(if using nvm)"
  )} \n- npm install`

  if (componentsList.length) {
    logMessage += ` \n\n🧩 Looks like this template requires components from ${chalk.bold("@wethegit/component-library")}. \nAfter installing dependencies run: \n- npx components-cli init \n- npx components-cli add ${componentsList.join(' ')}\n`
  }

  logMessage += `\n- npm start`;

  log("msg", logMessage)
};

export default printNextSteps;
