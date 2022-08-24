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
      text: "Enter the Github URL to use as a project template (optional; press enter to skip): ",
    },
  ],
};

export default CONSTS;
