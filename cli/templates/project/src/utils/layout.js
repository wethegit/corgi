import variables from "@local/styles/js-exports.module.scss"

/*
  Creates an object like this:

  {
    large: { min: 1024, max: 1143 },
    ...
  }
*/
export const breakpointRanges = Object.keys(variables)
  .filter((d) => d.includes("breakpoint-"))
  .reduce((acc, d) => {
    const values = variables[d].split(",")
    acc[d.replace("breakpoint-", "")] = {
      min: values[0],
      max: values[1] || null,
    }
    return acc
  }, {})

export const breakpointMap = new Map([
  ["medium-up", `${breakpointRanges.medium.min}px`],
  ["large-up", `${breakpointRanges.large.min}px`],
  ["xlarge-up", `${breakpointRanges.xlarge.min}px`],
  ["xxlarge-up", `${breakpointRanges.xxlarge.min}px`],
])

export const breakpointOrder = Array.from(breakpointMap.keys()).reverse()

export const layoutSettings = Object.keys(variables)
  .filter((d) => d.includes("layout-"))
  .reduce((acc, d) => {
    const value = variables[d]
    acc[d.replace("layout-", "")] = value
    return acc
  }, {})
