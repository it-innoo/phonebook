import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ])
  const [newName, setNewName] = useState('')

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
    }

    setPersons(persons.concat(createdPerson))
    setNewName('')
  }

  const handleNameChange = (event) =>
    setNewName(event.target.value)

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <form onSubmit={addPerson}>
        <div>
          Nimi:
          <input
            onChange={handleNameChange} value={newName}
          />
        </div>
        <div>
          <button type="submit">Lisää</button>
        </div>
      </form>

      <h2>Numerot</h2>
      {persons.map(p =>
        <div key={p.name}>
          {p.name}
        </div>
      )}
    </div>
  )

}

export default App;
