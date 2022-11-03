import { createContext, useState, useReducer } from "react"

const PAGE_TRANSITION_STATE = {
  ready: "ready",
  out: "out",
  in: "in",
  complete: "complete",
}

const SiteStateContext = createContext()

const SiteStateProvider = ({ children, version }) => {
  // The `useModal` hook is responsible for setting this value.
  // The reaosn this exists outside of that hook, is so that we can manage
  // unrelated content while a modal window is open (pausing videos, for example):
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

export { SiteStateProvider as default, SiteStateContext, PAGE_TRANSITION_STATE }
