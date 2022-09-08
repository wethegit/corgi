import { useEffect, useState } from "react"

// hooks
import useLocale from "../../hooks/use-locale"

// utilities
import classnames from "../../utils/classnames"

// misc
import * as styles from "./COMPONENT_SLUG.module.scss"

const COMPONENT_NAME = ({ className, ...props }) => {
  const { globals, page } = useLocale()
  
  return (
    <div className={classnames([styles.wrap, className])} {...props}>
      Corgi component template
    </div>
  )
}

export default COMPONENT_NAME
