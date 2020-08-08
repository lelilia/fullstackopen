import React from 'react'


const Language = ({ language }) => <li>{language.name}</li>

  
  const Languages = ({ languages }) => {
    return (
      <ul>
        {languages.map(language => 
          <Language key = {language.name} language = {language} />  
        )}
      </ul>
    )
  }
  
  const Properties = ({ text, value }) => (<p>{text} {value}</p>)
  
  const ShowFlag = ({ flag }) => {
    return (
      <img
        src = {flag}
        alt = "Flag"
        width = "100"
      />
    )
  }
  
  const OneCountry = ({ country }) => {
    return (
      <div>
        <h1>{country.name}</h1>
        <Properties text = "capitol" value = {country.capital} />
        <Properties text = "population" value = {country.population} />
        <h2>languages</h2>
        <Languages languages = {country.languages} />
        <ShowFlag flag = {country.flag} />
      </div>
      
    )
  }

export default OneCountry