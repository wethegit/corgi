import { Command } from "commander";
import newProject from "./commands/new-project.js";

const program = new Command();

program
  .name("corgi")
  .description("Welcome to the corgi CLI. Here's the description.");

program
  .command("new-project")
  .description(
    "Scaffold a new project, based either on the default template or on a Github template of your choosing."
  )
  .argument("[directory]")
  .option(
    "-c, --use-config",
    "Use an existing corgi.config.json file from within destination directory.",
    false
  )
  .action(newProject);

program
  .command("new-page")
  .description(
    "Generate one or many new pages, for each locale in your config."
  );
// .action(newPage);

program.parse();
