import { createContext, useEffect, useState, useReducer } from "react"

export const SiteStateContext = createContext()

export function SiteStateProvider({ children, version }) {
  // Use this to manage content unrelated to a modal while it's open
  // (pausing other videos, for example):
  const [modalOpen, setModalOpen] = useState(false)

  // Just an example here, of how you might adjust global elements
  // (i.e. higher DOM level than the page content), such as backgrounds:
  const [background, setBackground] = useState()

  const [pageHistory, addPage] = useReducer((history, newPage) => {
    return [newPage, ...history]
  }, [])

  useEffect(() => {
    console.log(`v${version}`)
  }, [])

  return (
    <SiteStateContext.Provider
      value={{
        modalOpen,
        setModalOpen,
        background,
        setBackground,
        pageHistory,
        addPage,
        version,
      }}
    >
      {children}
    </SiteStateContext.Provider>
  )
}
