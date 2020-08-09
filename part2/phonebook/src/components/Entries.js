import React from 'react'
import Entry from './Entry'

const Entries = ({ entries }) => {
  return (
    <ul>
      {entries.map((entry) => 
        <Entry key = {entry.name} entry = {entry}/>
      )}
    </ul>
  )
}

export default Entries