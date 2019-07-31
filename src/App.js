import React, { useState, useEffect } from 'react'
import nameService from './services/names'


const Filter = ({ handleChange, value }) => {
  return (
    <div>
      Rajaa näytettäviä
      <input onChange={handleChange} value={value} />
    </div>
  )
}


const Persons = ({ persons, deletePerson }) => {
  return (
    persons.map(p =>
      <div key={p.name}>
        {p.name} {p.number}
        <button onClick={() => deletePerson(p.id)}>
          Poista
          </button>
      </div>
    )

  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.handleSubmit}>
      <div>
        Nimi:
          <input
          onChange={props.handleNameChange} value={props.newName}
        />
      </div>
      <div>
        Numero:
          <input
          onChange={props.handleNumberChange} value={props.newNumber}
        />
      </div>
      <div>
        <button type="submit">Lisää</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    nameService
      .getAll()
      .then(initialNames => {
        setPersons(initialNames)
      })
  }, [])

  const handleNameChange = (event) =>
    setNewName(event.target.value)

  const handleNumberChange = (event) =>
    setNewNumber(event.target.value)

  const handleFilterChange = (event) =>
    setFilter(event.target.value)

  const personsToShow = filter.length === 0
    ? persons
    : persons.filter(p =>
      p.name.toLowerCase().includes(filter.toLowerCase()))

  const handleSubmit = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(p =>
      p.name === newName
    )

    if (existingPerson) {
      const ok = window.confirm(`${newName} on jo luettelossa, korvataanko vanha numero uudella`)

      if (ok) {
        nameService
          .replace({
            ...existingPerson,
            number: newNumber
          })
          .then(replacedPerson => {
            setPersons(persons.map(p => p.name === newName ? replacedPerson : p))
            setNewName('')
            setNewNumber('')
          })
      }
      return
    }

    const createdPerson = {
      name: newName,
      number: newNumber
    }

    nameService
      .create(createdPerson)
      .then(returnedPerspn => {
        setPersons(persons.concat(returnedPerspn))
        setNewName('')
        setNewNumber('')
      })
  }

  const removeName = (id) => {
    const person = persons.find(p => p.id === id)
    if (window.confirm(`Poistetaanko ${person.name} `)) {
      nameService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>

      <Filter handleChange={handleFilterChange} value={filter} />

      <h3>lisää uusi</h3>

      <PersonForm
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        handleSubmit={handleSubmit}
        newName={newName}
        newNumber={newNumber}
      />

      <h2>Numerot</h2>
      <Persons
        persons={personsToShow}
        deletePerson={removeName}
      />
    </div>
  )
}

export default App;
