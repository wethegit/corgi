import { useEffect, useReducer } from "react"
import { castToBool } from "../utils/utils"

/**
 * Manage state which also gets saved to the browser's localStorage
 *
 * @param {String} key - the localStorage key
 * @param {*} [defaultValue=""] - the localStorage value. Stringification is up to you to do.
 * @returns {Array} an array containing the state and an update function
 *
 * @example
 * const [favoriteFruit, setFavoriteFruit] = useLocalStorage("fruit", "apple")
 *
 */

function reducer(state, action) {
  if (typeof action === "string" && (action === "true" || action === "false")) {
    return castToBool(action)
  }
  return action
}

const useLocalStorage = (key, defaultValue = "") => {
  const [state, setState] = useReducer(reducer, defaultValue)

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedState = window.localStorage.getItem(key)
      setState(savedState || defaultValue)
    }
  }, [defaultValue, key])

  useEffect(() => {
    window.localStorage.setItem(key, state)
  }, [key, state])

  return [state, setState]
}

export default useLocalStorage
