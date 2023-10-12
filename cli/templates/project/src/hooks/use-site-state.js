import { useContext } from 'react'

import { SiteStateContext } from '@local/context'

export const useSiteState = () => useContext(SiteStateContext)
