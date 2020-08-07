import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Header from './components/Header'


const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then( response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.filter(person => person.name === newName).length !== 0) {
      alert(`${newName} is already added to the phonebook`) 
    }
    else {
      const newPersonObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(newPersonObject))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)
  
  const handleFilterChange = (event) => setFilter(event.target.value)

  const personsToShow = filter.length === 0 
    ? persons 
    : persons.filter(person => person.name.toLowerCase().includes(filter))

  return (
    <div>
      <Header text = "Phonebook"/>
      <Filter filter = {filter} onChange = { handleFilterChange } />
      <Header text = "add a new" />
      <PersonForm 
        addPerson = { addPerson } 
        nameChange = { handleNameChange } 
        numberChange = { handleNumberChange }
        newName = { newName }
        newNumber = { newNumber }
      />
      <Header text = "Numbers" />
      <Persons persons = { personsToShow } />
      
    </div>
  )
}

export default App