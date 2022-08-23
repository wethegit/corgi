const CONSTS = {
  CONFIG_FILENAME: "corgi-project.config.json",
  CONFIG_DEFAULTS: {
    templateURL:
      "https://github.com/wethegit/wtc-next-starter/tree/test/corgi-template",
    name: "corgi-project",
    dependencies: {},
    devDependencies: {},
    scripts: {},
  },
  QUESTIONS: [
    {
      id: "directory",
      text: "Enter a directory path for the project: ",
    },
  ],
};

export default CONSTS;
