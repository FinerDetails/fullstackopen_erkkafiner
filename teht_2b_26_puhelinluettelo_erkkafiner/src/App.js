import { useState } from 'react'
import Add from './components/Add'
import Filter from './components/Filter'
import Results from './components/Results'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState(persons)
  const [newInput, setNewInput] = useState('')


  const addInfo = (event) => {
  
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    if(persons.find((person) => person.name === newName) === undefined) {
      console.log("permitted")
      setPersons(persons.concat(newPerson))
      setNewFilter(persons.concat(newPerson))
    }
    else {
      alert(`"${newName}" has already been added to the phonebook.`)
    }
    setNewName("")
    setNewNumber("")
  }
  
  const filterInfo = (value) => {
    const personsCopy = [...persons]
    setNewFilter(personsCopy.filter(function(person) {
      return (person.name.toLowerCase().indexOf(value.toLowerCase()) !== -1)
    })
    )
  }


  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleInputChange = (event) => {
    filterInfo(event.target.value)
    setNewInput(event.target.value)
  }

  return (
    <>
      <Add addInfo={addInfo} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Phonebook</h2>
      <h3>Filter results</h3>
      <Filter newInput={newInput} handleInputChange={handleInputChange}/>
      <h3>Numbers</h3>
      <Results newFilter={newFilter}/>
    </>
  )
}

export default App
