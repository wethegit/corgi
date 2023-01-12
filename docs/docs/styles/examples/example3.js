import React from "react"

import "./styles/globals.scss"

const example3 = () => {
  return (
    <div className="row--large">
      <div className="column-example column--6">
        <p>I will be a 6 column element only at large+!</p>
      </div>
      <div className="column-example column--6">
        <p>Same here. Below that we will simply display default div styling.</p>
      </div>
    </div>
  )
}

export default example3