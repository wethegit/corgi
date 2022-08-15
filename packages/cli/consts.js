const CONSTS = {
  CONFIG_FILENAME: "corgi-project.config.json",
  CONFIG_DEFAULTS: {
    templateURL: "https://github.com/wethegit/corgi/tree/dev/templates/default",
    projectName: "corgi-project",
    dependencies: {},
    scripts: {},
  },
  QUESTIONS: [
    {
      id: "directory",
      text: "Enter a directory path for the project: ",
    },
    {
      id: "something",
      text: "Another question? ",
    },
  ],
};

export default CONSTS;
