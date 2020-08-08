import React from 'react'

const Country = ({ country, button }) => {
  
  return (
    <li>
      {country.name}
      <button onClick = {button}>show</button>
    </li>
  )
}

export default Country