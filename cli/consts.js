const CONSTS = {
  CONFIG_FILENAME: "corgi-project.config.json",
  CONFIG_DEFAULTS: {
    name: "corgi-project",
    dependencies: {},
    devDependencies: {},
    scripts: {},
  },
  QUESTIONS: [
    {
      id: "directory",
      text: 'Enter a directory name for the project. Use a relative path; to use the current directory, type "." : ',
    },
    {
      id: "template",
      text: "Do you have a Github branch to use as a project template? (Optional; enter to skip): ",
    },
  ],
};

export default CONSTS;
