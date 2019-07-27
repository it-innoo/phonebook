import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Arto Hellas',
      number: '040-1234567'
    }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

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

  return (
    <div>
      <h2>Puhelinluettelo</h2>
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
      {persons.map(p =>
        <div key={p.name}>
          {p.name} {p.number}
        </div>
      )}
    </div>
  )

}

export default App;
