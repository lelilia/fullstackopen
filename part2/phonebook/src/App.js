import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import NewEntryForm from './components/NewEntryForm '
import Entries from './components/Entries'
import Header from './components/Header'
import entryServices from './services/entries'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  const className = `message ${message.alert}`
  return (
    <div className = {className} >
      {message.text}
    </div>
  )
}

const App = () => {
  const [entries, setEntries] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [ notificationMessage, setNotificationMessage ] = useState(null)

  useEffect(() => {
    entryServices
      .getAll()
      .then(initialEntries => {
        setEntries(initialEntries)
      })
  }, [])

  const displayMessage = (name, change) => {
    if (change === "added") {
      setNotificationMessage({text: `Added ${name} sucessfully.`, alert: "green"})
    }
    else if (change === "updated") {
      setNotificationMessage({text: `Updated number for ${name} sucessfully.`, alert: "green"})
    }
    else if (change === "deleted") {
      setNotificationMessage({text: `Deleted number for ${name} sucessfully.`, alert: "green"})
    }
    else {
      setNotificationMessage({text: `Information of ${name} has already been removed from server`, alert: "red"})
    }
    setTimeout(()=> setNotificationMessage(null), 5000)
  }

  const addEntry = (event) => {
    event.preventDefault()
    const filteredEntries = entries.filter(entry => entry.name === newName)
    if (filteredEntries.length !== 0) {
      
      const entry = filteredEntries[0]
      const id = entry.id
      const confirmMessage = `${entry.name} is already added to the phonebook, replace the old number with a new one?`

      if (window.confirm(confirmMessage)) {
        const changedEntry = { ...entry, number: newNumber }

        entryServices
          .update(id, changedEntry)
          .then(returnedEntry => {
            setEntries(entries.map(entry => entry.id !== id ? entry : returnedEntry))
            displayMessage(returnedEntry.name, "updated")
          })
          .catch(error => {
            displayMessage(entry.name, "error")
            setEntries(entries.filter(e => e.id !== entry.id))
          })
      }
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
          displayMessage(returnedEntry.name, "added")
        })
        .catch(error => console.log(error))
    }
    setNewNumber('')
    setNewName('')
  }

  const deleteEntry = entry => {
    if (window.confirm(`Delete ${entry.name}?`)) {
      const id = entry.id
      entryServices
        .deleteEntry(entry.id)
        .then(() => {
          setEntries(entries.filter(entry => entry.id !== id))
          displayMessage(entry.name, "deleted")
        })
        .catch(() => {
          displayMessage(entry.name, "error")
          setEntries(entries.filter(e => e.id !== entry.id))
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
      <Header text="Phonebook" />
      <Notification message = {notificationMessage} alert = "green"/>
      <Filter filter={filter} onChange={handleFilterChange} />
      <Header text="add a new" />
      <NewEntryForm
        addPerson={addEntry}
        nameChange={handleNameChange}
        numberChange={handleNumberChange}
        newName={newName}
        newNumber={newNumber}
      />
      <Header text="Numbers" />
      <Entries
        entries={entriesToShow}
        deleteButton={deleteEntry}
      />

    </div>
  )
}

export default App