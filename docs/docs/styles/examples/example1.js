import React from "react"

import "./styles/globals.scss"

const example1 = () => {
  return (
    <div className="row-example">
      <div className="column-example column--4">
        <p>I'm a 4 column element</p>
      </div>
      <div className="column-example column--4">
        <p>I'm another 4 column element</p>
      </div>
      <div className="column-example column--4">
        <p>I'm a third 4 column element, together we add up to 12 columns</p>
      </div>
    </div>
  )
}

export default example1