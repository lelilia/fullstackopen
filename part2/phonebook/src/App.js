import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'


const Header = ( {text} ) => <h2>{text}</h2>

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

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