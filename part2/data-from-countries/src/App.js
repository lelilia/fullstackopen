import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Result from './components/Result'


const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filter, setFilter ] = useState('')

  const url = "https://restcountries.eu/rest/v2/all"

  useEffect(() => {
    axios
      .get(url)
      .then( response => {
        setCountries(response.data)
      })
  }, [])

  const handleShowButton = (event) => {
    const newFilter = event.target.previousSibling.nodeValue.toLowerCase()
    setFilter(newFilter)
  }

  const handleFilterChange = (event) => setFilter(event.target.value)

  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))



  return (
    <div>
      <Filter value = {filter} onChange = {handleFilterChange} />
      <Result countries = {filteredCountries} button = { handleShowButton }/>

    </div>
  )
}

export default App 