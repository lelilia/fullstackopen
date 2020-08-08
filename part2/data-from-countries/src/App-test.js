import React, {useState, useEffect} from 'react'
import axios from 'axios'

const Filter = ({ filter, onChange }) => {
  return (
    <div>
      find countries <input value={filter} onChange={onChange} />
    </div>
  )
}



const Language = ({ language }) => <li>{language.name}</li>


const Languages = ({ languages }) => {
  return (
    <ul>
      {languages.map(language =>
        <Language key={language.name} language={language} />
      )}
    </ul>
  )
}

const Properties = ({ text, value }) => (<p>{text} {value}</p>)

const ShowFlag = ({ flag }) => {
  return (
    <img
      src={flag}
      alt="Flag"
      width="100"
    />
  )
}

const ShowButton = ({ onClick, country }) => {
  return (
    <button onClick = {onClick}>
      show
    </button>
  )
}

const Country = ({ country,button }) => {

  return (
    <li>
      {country.name}
      <ShowButton onClick = {button} country = {country.name}/>
    </li>
  )
}
const OneCountry = ({ country }) => {
  console.log(country)
  return (
    <div>
      <h1>{country.name}</h1>
      <Properties text="capitol" value={country.capital} />
      <Properties text="population" value={country.population} />
      <h2>languages</h2>
      <Languages languages={country.languages} />
      <ShowFlag flag={country.flag} />
    </div>

  )
}


const Countries = ({ countries,button }) => {
  if (countries.length === 1) {
    return (
      <OneCountry country={countries[0]} />
    )
  }
  else {
    return (
      <ul>
        {countries.map(country =>
          <Country key={country.name} country={country} button = {button} />
        )}
      </ul>
    )
  }
}

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
      <Countries countries={countries} button = {button} />
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


const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const url = "https://restcountries.eu/rest/v2/all"

  useEffect(() => {
    axios
      .get(url)
      .then(response => {
        setCountries(response.data)
      })
  }, [])

  const handleShowButton = (event) => {
    const newFilter = event.target.previousSibling.nodeValue.toLowerCase()
    setFilter(newFilter)
  }

  const handleFilterChange = (event) => setFilter(event.target.value)

  const filteredCountries = countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))

  console.log("filter in App", filter)

  return (
    <div>
      <Filter value={filter} onChange={handleFilterChange} />
      <Result countries={filteredCountries} button = {handleShowButton} />

    </div>
  )
}


export default App