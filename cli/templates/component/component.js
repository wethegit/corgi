//packages
import { useEffect, useState } from "react"

// components

// hooks
import useLocale from "../../hooks/use-locale"

// utilities
import classnames from "../../utils/classnames"

// styles
import * as styles from "./COMPONENT_SLUG.module.scss"

const COMPONENT_NAME = ({ className, ...props }) => {
  const { globals, page } = useLocale()
  
  return (
    <div className={classnames([styles.wrap, className])} {...props}>
      <code>COMPONENT_NAME</code>!
    </div>
  )
}

export default COMPONENT_NAME
