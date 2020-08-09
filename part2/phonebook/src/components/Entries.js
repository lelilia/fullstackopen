import React from 'react'
import Entry from './Entry'

const Entries = ({ entries, deleteButton }) => {
  return (
    <ul>
      {entries.map((entry) => 
        <Entry 
          key = {entry.name} 
          entry = {entry} 
          deleteButton = {deleteButton}
        />
      )}
    </ul>
  )
}

export default Entries