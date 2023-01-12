import React from "react"

import "./styles/globals.scss"

const example2 = () => {
  return (
    <div className="row-example">
      <div className="column-example column--10 column-xlarge--6">
        <p>I'm 10 columns at medium and large and 6 columns from xlarge</p>
      </div>
      <div className="column-example column--2 column-xlarge--6">
        <p>I'm 2 columns at medium and large and 6 columns from xlarge</p>
      </div>
    </div>
  )
}

export default example2