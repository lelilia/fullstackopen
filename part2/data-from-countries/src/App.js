import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import SearchResult from './components/SearchResult'

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [weather, setWeather] = useState('')
  const [oneCountryBool, setOneCountryBool] = useState(false)
  const [capital, setCapital] = useState('')

  const api_key = process.env.REACT_APP_API_KEY
  const urlCountryAPI = "https://restcountries.eu/rest/v2/all"
  const urlWeather = "http://api.weatherstack.com/current?access_key="+api_key + "&query="

  useEffect(() => {
    axios
      .get(urlCountryAPI)
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  
  useEffect(() => {
    const url = urlWeather + capital
    axios
      .get(url)
      .then(response => {
        setWeather(response.data.current)
      })

  }, [capital])

 
  useEffect(() => {
    if (oneCountryBool && filteredCountries[0].capital !== capital) {

      setCapital(filteredCountries[0].capital)
    }
  }, [oneCountryBool])

  const handleShowButton = (event) => {
    const newFilter = event.target.previousSibling.nodeValue.toLowerCase()
    setFilter(newFilter)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value.toLowerCase())
  }


  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter))


  if (filteredCountries.length === 1 && oneCountryBool === false) {
    setOneCountryBool(true)
  }
  else if (filteredCountries.length > 1 && oneCountryBool === true) {
    setOneCountryBool(false)
  }



  return (
    <div>
      <Filter
        filter={filter}
        onChange={handleFilterChange}
      />
      <SearchResult
        countries={filteredCountries}
        button={handleShowButton}
        weather={weather}
      />
    </div>
  )
}


export default App