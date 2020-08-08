import React from 'react'
import Country from './Country'
import OneCountry from './OneCountry'

const Countries = ({ countries, button }) => {
  if (countries.length === 1) {
    return (
      <OneCountry country = {countries[0]} />
    )
  }
  else{
    return (
      <ul>
        {countries.map( country => 
          <Country key = {country.name} country = {country} button = {button}/>  
        )}
      </ul>
    )
  }
}

export default Countries
