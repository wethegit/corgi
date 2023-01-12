import React from "react"

import "./styles/globals.scss"

const example4 = () => {
  return (
    <div className="row-example">
      <div className="column-example column--10">
        <div className="row-example">
          <div className="column-example column--deep column--6">
            <p>I'm a deep element that is 5 columns wide</p>
          </div>
          <div className="column-example column--deep column--6">
            <p>I'm a deep element that is 5 columns wide</p>
          </div>
        </div>
      </div>
      <div className="column-example column--2">
        <p>I'm an element that is 2 columns wide</p>
      </div>
    </div>
  )
}

export default example4