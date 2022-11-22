#!/usr/bin/env node

import { Command } from "commander";

import component from "./commands/component.js";
import page from "./commands/page.js";
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
  .argument(
    "[directory]",
    'Relative path to your intended project directory. Use a dot "." for the current working directory. Examples:\ncorgi project my-web-app\ncorgi project .'
  )
  .option(
    "-t, --template <url>",
    "URL of a Github repo's branch containing a corgi template. Example:\ncorgi project my-web-app --template https://github.com/<user>/<repo>/tree/<branchname>"
  )
  .action(project);

program
  .command("page")
  .description(
    "Generate one or multiple new pages within a corgi app. Must be executed from the root of the project directory."
  )
  .argument(
    "[names...]",
    "Page component name(s), space-separated. Use the intended case when providing names. Examples:\ncorgi page AboutPage\ncorgi page MyPage YourPage TheirPage"
  )
  .option(
    "-l, --locales [locales...]",
    "A space-separated list of locales to generate the page(s) for. Example:\ncorgi page AboutPage --locales en es fr pt"
  )
  .action(page);

program
  .command("component")
  .description(
    "Generate one or many new React components within a corgi app. Includes a `.scss` module file for each. Must be executed from the root of the project directory."
  )
  .argument(
    "[names...]",
    "Component name(s), space-separated. Use the intended case when providing names. Examples:\ncorgi component ButtonIcon\ncorgi component ToggleSwitch TabbedList Slideshow"
  )
  .action(component);

program.parse();
