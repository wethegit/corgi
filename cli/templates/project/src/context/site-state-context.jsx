import { createContext, useEffect, useState, useReducer } from "react"

export const SiteStateContext = createContext()

export function SiteStateProvider({ children, version }) {
  // Use this to manage content unrelated to a modal while it's open
  // (pausing other videos, for example):
  const [modalOpen, setModalOpen] = useState(false)

  const [pageHistory, addPage] = useReducer((history, newPage) => {
    return [newPage, ...history]
  }, [])

  useEffect(() => {
    console.log(`Version: ${version}`)
  }, [version])

  return (
    <SiteStateContext.Provider
      value={{
        modalOpen,
        setModalOpen,
        pageHistory,
        addPage,
        version,
      }}
    >
      {children}
    </SiteStateContext.Provider>
  )
}
