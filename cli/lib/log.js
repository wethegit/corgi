import chalk from "chalk";
import { Spinner } from "cli-spinner";

const LOG_TYPE = new Map([
  ["err", { color: "red", word: "🐀 Error" }],
  ["msg", { color: "dim" }],
  ["ok", { color: "green", word: "🐶 Success" }],
  ["warn", { color: "yellow", word: "⚠️  Warning" }],
]);

const log = (type, message, useSpinner = false) => {
  const { color, word } = LOG_TYPE.get(type);
  const prefix = chalk[color](word ? `${word}: ` : "");
  const msg = chalk[type === "err" ? color : "white"](message);
  const fullText = `${prefix}${msg}`;

  if (useSpinner) {
    const spinner = new Spinner(fullText);
    spinner.setSpinnerString("⢄⢂⢁⡁⡈⡐⡠");
    spinner.start();
    return spinner;
  } else {
    console.log(fullText);
  }
};

export const killSpinner = (instance) => {
  instance.stop();
  process.stdout.write("\n");
};

export default log;
