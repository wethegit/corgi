export function castToBool(input) {
  if (typeof input === "boolean") return input
  return input === "true" ? true : false
}