import React from 'react'

const Button = ({ onClick }) => <button onClick = {onClick}>show</button>

const CountryList = ({ countries, button }) => {
  return (
    <ul>
      {countries.map(country => <li key = {country.name}>{country.name}<Button onClick = {button} /></li> )} 
      
    </ul>
  )
}

export default CountryList