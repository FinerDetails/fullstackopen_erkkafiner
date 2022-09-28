import axios from 'axios'
import { useState, useEffect } from 'react'

const Render = ({filter, setFilter}) => {
  console.log("length", filter.length)
  if (filter.length === 1) {
    const oneCountry = filter[0]
    return (
      <>
      <h2>{oneCountry.name.common}</h2>
      <p>Capital: {oneCountry.capital}</p>
      <p>Area: {oneCountry.area}</p>
      <br/>
      <h3>Languages</h3>
      <ul>
        {Object.values(oneCountry.languages).map((language) => <li key={oneCountry.name+language}>{language}</li>)}
      </ul>
      <br/>
      <img src={oneCountry.flags.png} alt={oneCountry.flag}></img>
      </>
    )
  }
  else if(filter.length < 11 && filter.length > 1) {
    return (
      <ul>
      {filter.map(function(country) {
        const displayOneCountry = () => {
          setFilter([country])
        }
        return (
          <li key={country.ccn3}><button onClick={displayOneCountry}>show</button> {country.name.common}</li>
        )})
      }
      </ul>
    )
  }
  else {
    return (
      <>
        <p>{filter.length} countries found, specify another filter</p>
      </>
    )
  }
}


const App = () => {
  const [input, setInput] = useState('')
  const [countries, setCountry] = useState([])
  const [filter, setFilter] = useState([])

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountry(response.data)
      setFilter(response.data)
    })
  },[])

  const search = (value = '') => {
    const countriesCopy = [...countries]
    setFilter(countriesCopy.filter(function(country) {
      return (country.name.common.toLowerCase().indexOf(value.toLowerCase()) !== -1)
    })
    )
  }

  
  const handleInput = (event) => {
    search(event.target.value)
    setInput(event.target.value)
    console.log(filter)
  }
  return (
    <div >
      <form>
        Search for countries: <input value={input} onChange={handleInput}></input>
      </form>
        <Render filter={filter} setFilter={setFilter}/>
    </div>
  );
}

export default App;
