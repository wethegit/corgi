const CONSTS = {
  CONFIG_FILENAME: "corgi.config.json",
  CONFIG_DEFAULTS: {
    projectName: "my-project",
    templateURL: "https://github.com/wethegit/wtc-next-starter/tree/dev",
    pages: ["home"],
    locales: ["en-US"],
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
