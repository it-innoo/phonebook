import React, { useState } from 'react'

const Filter = ({ handleChange, value }) => {
  return (
    <div>
      Rajaa näytettäviä
      <input onChange={handleChange} value={value} />
    </div>
  )
}
const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(p =>
      p.name === newName
    )

    if (existingPerson !== undefined) {
      window.alert(`${newName} on jo luettelossa`)
      return
    }

    const createdPerson = {
      name: newName,
      number: newNumber
    }

    setPersons(persons.concat(createdPerson))
    setNewName('')
    setNewNumber('')
  }

  const handleNameChange = (event) =>
    setNewName(event.target.value)

  const handleNumberChange = (event) =>
    setNewNumber(event.target.value)

  const handleFilterChange = (event) =>
    setFilter(event.target.value)

  const personsToShow = filter.length === 0
    ? persons
    : persons.filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h2>Puhelinluettelo</h2>

      <Filter handleChange={handleFilterChange} value={filter} />

      <h3>lisää uusi</h3>
      <form onSubmit={addPerson}>
        <div>
          Nimi:
          <input
            onChange={handleNameChange} value={newName}
          />
        </div>
        <div>
          Numero:
          <input
            onChange={handleNumberChange} value={newNumber}
          />
        </div>
        <div>
          <button type="submit">Lisää</button>
        </div>
      </form>

      <h2>Numerot</h2>
      {personsToShow.map(p =>
        <div key={p.name}>
          {p.name} {p.number}
        </div>
      )}
    </div>
  )

}

export default App;
