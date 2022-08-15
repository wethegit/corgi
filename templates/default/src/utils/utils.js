const castToBool = (input) => {
  if (typeof input === "boolean") return input
  return input === "true" ? true : false
}

export { castToBool }
