import React from 'react'
import ShowOneCountry from './ShowOneCountry'
import CountryList from './CountryList'
import ShowText from './ShowText'




const SearchResult = ({ countries, button, weather }) => {
  if (countries.length > 10) {
    return (
      <ShowText text = "Too many matches, specify another filter" />
    )
  }
  else if (countries.length > 1) {
    return (
      <CountryList countries = {countries} button = {button} />
    )
  }
  else if (countries.length === 1) {
    return (
      <ShowOneCountry country={countries[0]} weather={weather} />
    )
  }
  else {
    return (
      <ShowText text = " There is no country matching your filter." />
    )
  }
}
export default SearchResult 