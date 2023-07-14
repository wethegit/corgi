import { createContext } from "react"

export const PageContext = createContext()

export function PageProvider({ children, page }) {
  return <PageContext.Provider value={{ page }}>{children}</PageContext.Provider>
}
