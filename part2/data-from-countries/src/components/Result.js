import React from 'react'
import Countries from './Countries'

const Result = ({ countries, button }) => {
  if (countries.length > 10) {
    return (
      <p>
        Too many matches, specify another filter
      </p>
    )
  }
  else if (countries.length > 0) {
    return (
      <Countries countries = {countries} button = {button}  />
    )
  }
  else {
    return (
      <p>
        There are no countries matching your filter. 
      </p>
    )
  }
}

export default Result