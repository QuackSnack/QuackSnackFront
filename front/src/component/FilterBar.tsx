import { ReactElement, useContext, useState } from 'react'
import { QSContext, reactContext } from '../plugin/context'

function FilterBar(): ReactElement {
  const context: QSContext = useContext(reactContext)

  return (
    <div className="filterbar">
      <h1>filter bar</h1>
    </div>
  )
}

export default FilterBar
