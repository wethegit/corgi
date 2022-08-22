/**
 * This is a wrapper around UserPreferencesContext
 * It gives you access to common accessibility preferences which are
 * stored in localStorage, and the ability to toggle these preferences
 * on and off (prefers-reduced-motion, for example).
 *
 * @example
 * const { prefersReducedMotion, togglePrefersReducedMotion } = useUserPrefs()
 *
 * // or, for more manageable variable names, feel free to alias them:
 *
 * const {
 *   prefersReducedMotion: rm,
 *   togglePrefersReducedMotion: toggleRm
 * } = useUserPrefs()
 *
 */

import { useContext } from "react"
import { UserPreferencesContext } from "../context/user-prefs-context"
import { castToBool } from "../utils/utils"

const useUserPrefs = () => {
  const {
    prefersDarkColorScheme,
    setPrefersDarkColorScheme,
    prefersReducedData,
    setPrefersReducedData,
    prefersReducedMotion,
    setPrefersReducedMotion,
  } = useContext(UserPreferencesContext)

  const togglePrefersDarkColorScheme = () => {
    setPrefersDarkColorScheme(!castToBool(prefersDarkColorScheme))
  }

  const togglePrefersReducedData = () => {
    setPrefersReducedData(!castToBool(prefersReducedData))
  }

  const togglePrefersReducedMotion = () => {
    setPrefersReducedMotion(!castToBool(prefersReducedMotion))
  }

  return {
    prefersDarkColorScheme,
    togglePrefersDarkColorScheme,
    prefersReducedData,
    togglePrefersReducedData,
    prefersReducedMotion,
    togglePrefersReducedMotion,
  }
}

export default useUserPrefs
