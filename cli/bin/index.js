#!/usr/bin/env node

import { Command } from "commander";
import project from "./commands/project.js";

const program = new Command();

program
  .name("corgi")
  .description("Welcome to the corgi CLI. Here's the description.");

program
  .command("project")
  .description(
    "Scaffold a new project, based either on the default template or on a Github template of your choosing."
  )
  .argument("[directory]")
  .option(
    "-t, --template <url>",
    "URL of a Github repo's branch containing a Corgi template.\nExample: https://github.com/<user>/<repo>/tree/<branchname>",
    null
  )
  .action(project);

program
  .command("page")
  .description(
    "Generate one or many new pages, for each locale in your config. TODO: prioritize a --locales flag; fall back to the locales array in the project's config-locales.js"
  );
// .action(page);

program.parse();
