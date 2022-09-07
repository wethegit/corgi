import CONSTS from "../consts.js";

export const getQuestion = (id) =>
  CONSTS.QUESTIONS.find((q) => q.id === id).text;

export const pascalToKebab = (str) =>
  str.replace(/([a-z0–9])([A-Z])/g, "$1-$2").toLowerCase();
