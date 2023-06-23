import { useCallback, useEffect, useState } from "react"
import { useRouter } from "next/router"

import { useSiteState } from "./use-site-state"

export function useModal() {
  const [open, setOpen] = useState(false)
  const [modalSlug, setModalSlug] = useState()
  const { setModalOpen: setGlobalModalOpen } = useSiteState()
  const router = useRouter()

  // Toggle function for the modal state. true/false => open/closed
  const toggleModal = useCallback((state) => {
    if (typeof state !== "boolean") {
      console.error(`toggleModal: state argument must be boolean`)
      return
    }
    setOpen(state)
  }, [])

  // Runs a check for whether the current URL's hash bang matches the modalSlug, and opens the modal if so.
  useEffect(() => {
    if (modalSlug && window.location.hash === `#!/${modalSlug}`) setOpen(true)
  }, [modalSlug])

  // Sets a global flag that a modal is open somewhere. Useful for managing outside elements.
  useEffect(() => {
    setGlobalModalOpen(open)
  }, [open, setGlobalModalOpen])

  // Manage the adding and removal of a hash bang on open/close if a modalSlug is set.
  useEffect(() => {
    if (!modalSlug) return

    if (open) router.push({ hash: `!/${modalSlug}` })
    else {
      router.push(window.location.pathname + window?.location.search || "", null, {
        shallow: true,
        scroll: false,
      })
    }
  }, [modalSlug, open])

  // Automatically open the modal if the slug has been set, and a corresponding hash is in the URL.
  useEffect(() => {
    if (modalSlug && window.location.hash === `#!/${modalSlug}`) setOpen(true)
  }, [modalSlug])

  return {
    modalState: open,
    toggleModal,
    setModalSlug,
  }
}

