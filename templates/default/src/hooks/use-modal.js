import { useEffect, useState } from "react"
import useSiteState from "../hooks/use-site-state"
import { useRouter } from "next/router"

const useModal = () => {
  const [open, setOpen] = useState(false)
  const [modalSlug, setModalSlug] = useState(() => null)
  const { setModalOpen: setGlobalModalOpen } = useSiteState()
  const router = useRouter()

  // Toggle function for the modal state.
  // If a `modalSlug` has been set, we'll only update the route/hash here —
  // state management will be handled on route change instead.
  const toggleModal = () => {
    if (modalSlug) {
      if (open)
        router.push(window.location.pathname, null, { shallow: true, scroll: false })
      else router.push({ hash: `!/${modalSlug}` })
    } else {
      setOpen((open) => !open)
    }
  }

  const handleHashChange = () => {
    if (typeof window === "undefined") return

    if (window.location.hash === `#!/${modalSlug}`) setOpen(true)
    else setOpen(false)
  }

  useEffect(() => {
    if (!modalSlug) return
    // Ensures that this hash logic runs if a slug was there from the start:
    handleHashChange()

    router.events.on("hashChangeComplete", handleHashChange)
    return () => router.events.off("hashChangeComplete", handleHashChange)
  }, [modalSlug])

  // Sets a global flag that a modal is open somewhere. Useful for managing outside elements.
  useEffect(() => {
    setGlobalModalOpen(open)
  }, [open, setGlobalModalOpen])

  return {
    modalState: open,
    toggleModal,
    setModalSlug,
  }
}

export default useModal
