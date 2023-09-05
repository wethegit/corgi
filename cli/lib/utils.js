import CONSTS from "../consts.js";

export const getQuestion = (id) =>
  CONSTS.QUESTIONS.find((q) => q.id === id).text;

// Very thorough kebab-casing regex replacer from StackOverflow user ABabin:
// https://stackoverflow.com/a/67243723
export const makeKebabCase = (str) => str.replace(
  /[A-Z]+(?![a-z])|[A-Z]/g,
  (match, offset) => (offset ? "-" : "") + match.toLowerCase()
)

const throwDirectoryPathError = (arg, example) => {
  throw new Error(
    `Expected ${arg} (string) argument. For example, '${example}'.`
  );
};
  
export const assembleDirectoryPath = ({ pathToDir, inputName } = {}) => {
  if (!pathToDir) throwDirectoryPathError("pathToDir", "./src/components");
  if (!inputName) throwDirectoryPathError("inputName", "MyComponent");

  const parts = inputName.split("/");
  const name = parts.pop();
  const slug = makeKebabCase(name);
  const subDirectory = parts.join("/");

  const directory = `${pathToDir}/${subDirectory ? subDirectory + "/" : ""}${slug}`

  return {
    directory,
    subDirectory,
    name,
    slug,
  };
}
  