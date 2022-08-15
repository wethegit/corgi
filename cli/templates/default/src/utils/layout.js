import variables from "../styles/js-exports.module.scss"

let breakpointRanges = {}

/* 
  Creates an object like this:

  { 
    large: { min: 1024, max: 1143 }, 
    ... 
  }
*/

Object.keys(variables)
  .filter((d) => d.includes("breakpoint-"))
  .forEach((d) => {
    let values = variables[d].split(",")
    breakpointRanges[d.replace("breakpoint-", "")] = {
      min: values[0],
      max: values[1] || null,
    }
  })

const breakpointMap = new Map([
  ["medium-up", `${breakpointRanges.medium.min}px`],
  ["large-up", `${breakpointRanges.large.min}px`],
  ["xlarge-up", `${breakpointRanges.xlarge.min}px`],
  ["xxlarge-up", `${breakpointRanges.xxlarge.min}px`],
])

const breakpointOrder = Array.from(breakpointMap.keys()).reverse()

const layoutSettings = {}
Object.keys(variables)
  .filter((d) => d.includes("layout-"))
  .forEach((d) => {
    let value = variables[d]
    layoutSettings[d.replace("layout-", "")] = value
  })

export { breakpointMap, breakpointOrder, breakpointRanges, layoutSettings }
