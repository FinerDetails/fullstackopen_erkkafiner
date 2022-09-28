import { useState, useEffect } from 'react'
import Add from './components/Add'
import Filter from './components/Filter'
import Results from './components/Results'
import Message from './components/Message'
import ErrorMessage from './components/ErrorMessage'
import personService from './services/persons_service'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState([])
  const [newInput, setNewInput] = useState('')
  const [message, setNewMessage] = useState(null)
  const [errorMessage, setNewErrorMessage] = useState(null)

  useEffect(() => {
    personService
    .getAll()
    .then(initialPersons => {
      setNewFilter(initialPersons)
      setPersons(initialPersons)
    })
  }, [])
  const addInfo = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }
    let id
    let index
    if(persons.find((person) => {
      id = person.id
      index = persons.indexOf(person)
      return(
      person.name === newName)}) === undefined) {
      console.log("permitted")
      personService
      .create(newPerson)
      .then(returnedPerson => {
        setNewFilter(persons.concat(returnedPerson))
        setPersons(persons.concat(returnedPerson))
        setNewMessage(
          `Added ${newName}`
        )
        setTimeout(() => {
          setNewMessage(null)
        }, 3000)
      })
    }
    else {
      if (window.confirm(`"${newName}" has already been added to the phonebook. replace the old number?`)) {
        personService.replace(id, newPerson)
        .then(() => {
          console.log(index)
          const personsCopy = [...persons]
          personsCopy[index].number = newPerson.number
          setNewFilter(personsCopy)
          setPersons(personsCopy)
          setNewMessage(
            `Changed number of ${newName}`
          )
          setTimeout(() => {
            setNewMessage(null)
          }, 3000)
        })
        .catch(() => {
          setNewErrorMessage(
            `Information of ${newName} not found on the server!`
          )
          setTimeout(() => {
            setNewErrorMessage(null)
          }, 3000)
        })
      }
    }
    setNewName("")
    setNewNumber("")
  }
  const deleteInfo = (id) => {
    const personsCopy = [...persons]
    const remainingPersons = personsCopy.filter((person) => person.id !== id)
    personService.erase(id)
    .then(() => {
      setPersons(remainingPersons)
      setNewFilter(remainingPersons)
      setNewMessage(
        `Deleted ${(personsCopy.find((person) => person.id === id)).name}`
      )
      setTimeout(() => {
        setNewMessage(null)
      }, 3000)
    })
    .catch(() => {
      setNewErrorMessage(
        `Information of ${(personsCopy.find((person) => person.id === id)).name} not found on the server!`
      )
      setTimeout(() => {
        setNewErrorMessage(null)
      }, 3000)
    })
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
      <Message message={message}/>
      <ErrorMessage errorMessage={errorMessage} />
      <Add addInfo={addInfo} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Phonebook</h2>
      <h3>Filter results</h3>
      <Filter newInput={newInput} handleInputChange={handleInputChange}/>
      <h3>Numbers</h3>
      <ul>
        {newFilter.map(person =>
          <Results
            key={person.name}
            person={person}
            deleteInfo={() => deleteInfo(person.id)}/>
          )
        }
      </ul>
      
    </>
  )
}

export default App
