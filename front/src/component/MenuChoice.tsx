import { ReactElement, useState } from 'react'
import { Choice } from '../interface/Choice'
import { useCurrentContext } from '../plugin/context'

function MenuChoice(props: { choice: Choice[] }): ReactElement {
  const { choice } = props

  return (
    <div>
      {choice.map((c) => {
        return (
          <div key={c.id}>
            <h3>{c.name}</h3>
            <div key={c.id}>
              {c.possibilities.map((possibility) => {
                return <h5 key={possibility.id}>{possibility.name}</h5>
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default MenuChoice
