import { createContext, useState, useReducer } from "react"

export const PAGE_TRANSITION_STATE = {
  ready: "ready",
  out: "out",
  in: "in",
  complete: "complete",
}

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

  const [transitionState, transitionEvent] = useReducer((_, event) => {
    switch (event) {
      case "reset":
      case "onExit":
        return PAGE_TRANSITION_STATE.ready
      case "onExiting":
        return PAGE_TRANSITION_STATE.out
      case "onEntering":
        return PAGE_TRANSITION_STATE.in
      case "onEntered":
        return PAGE_TRANSITION_STATE.complete
    }
  }, PAGE_TRANSITION_STATE.complete)

  return (
    <SiteStateContext.Provider
      value={{
        modalOpen,
        setModalOpen,
        background,
        setBackground,
        pageHistory,
        addPage,
        transitionState,
        transitionEvent,
        version,
      }}
    >
      {children}
    </SiteStateContext.Provider>
  )
}
