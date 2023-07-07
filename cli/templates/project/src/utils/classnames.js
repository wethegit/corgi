export function classnames(classes) {
  if (!classes) return null
  if (typeof classes === 'string') return classes

  return classes.flat().filter(c => Boolean(c)).join(" ")
}
