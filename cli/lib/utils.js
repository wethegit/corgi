import CONSTS from "../consts.js";

export const getQuestion = (id) =>
  CONSTS.QUESTIONS.find((q) => q.id === id).text;

export const pascalToKebab = (str) =>
  str.replace(/([a-z0–9])([A-Z])/g, "$1-$2").toLowerCase();

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
  const slug = pascalToKebab(name);
  const subDirectory = parts.join("/");

  const directory = `${pathToDir}/${subDirectory ? subDirectory + "/" : ""}${slug}`

  return {
    directory,
    subDirectory,
    name,
    slug,
  };
}
  