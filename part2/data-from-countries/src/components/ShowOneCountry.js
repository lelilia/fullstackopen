import React from 'react'


const ShowOneCountry = ({ country, weather }) => {
  if (weather) {
    return (
      <div>
        <h1>{country.name}</h1>
        <p>
          capital {country.capital}
          <br />
          population {country.population}
        </p>
        <h2>languages</h2>
        <ul>
          {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img src={country.flag} alt="Flag" width="100" />
        <h2>Weather in {country.capital}</h2>
        <p>
          <strong>temperature:</strong> {weather.temperature}°Celsius
        </p>
        {weather.weather_icons.map(icon => <img key={icon} src={icon} alt="icon" />)}
        <p>
          <strong>wind:</strong> {weather.wind_speed} mph direction {weather.wind_dir}
        </p>
      </div>
    )
  }
  return (
    <div>
      <h1>{country.name}</h1>
      <p>
        capital {country.capital}
        <br />
        population {country.population}
      </p>
      <h2>languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt="Flag" width="100" />

    </div>
  )
}


export default ShowOneCountry