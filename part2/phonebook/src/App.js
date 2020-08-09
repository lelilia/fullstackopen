import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import NewEntryForm  from './components/NewEntryForm '
import Entries from './components/Entries'
import Header from './components/Header'
import entryServices from './services/entries'


const App = () => {
  const [ entries, setEntries ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')

  useEffect(() => {
    entryServices
      .getAll()
      .then(initialEntries => {
        setEntries(initialEntries)
      })
  }, [])

  const addEntry = (event) => {
    event.preventDefault()

    if (entries.filter(entry => entry.name === newName).length !== 0) {
      alert(`${newName} is already added to the phonebook`) 
    }
    else {
      const newEntryObject = {
        name: newName,
        number: newNumber
      }

      entryServices
        .create(newEntryObject)
        .then(returnedEntry => {
          setEntries(entries.concat(returnedEntry))
          setNewNumber('')
          setNewName('')
        })
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)

  const handleNumberChange = (event) => setNewNumber(event.target.value)
  
  const handleFilterChange = (event) => setFilter(event.target.value.toLowerCase())

  const entriesToShow = filter.length === 0 
    ? entries 
    : entries.filter(entry => entry.name.toLowerCase().includes(filter))

  return (
    <div>
      <Header text = "Phonebook"/>
      <Filter filter = {filter} onChange = { handleFilterChange } />
      <Header text = "add a new" />
      <NewEntryForm 
        addPerson = { addEntry } 
        nameChange = { handleNameChange } 
        numberChange = { handleNumberChange }
        newName = { newName }
        newNumber = { newNumber }
      />
      <Header text = "Numbers" />
      <Entries entries = { entriesToShow } />
      
    </div>
  )
}

export default App