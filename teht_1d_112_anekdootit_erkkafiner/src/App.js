import { useState } from 'react'
const App = () => {
  
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'No votes given.'
  ]
  let copy = [0, 0, 0, 0, 0, 0]

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0, 0, 0, 0, 0, 0])
  const [mostIndex, setMostIndex] = useState(7)
  const setRandom = () => {
    setSelected(Math.floor(Math.random()*6))
  }
  const addPoints = () => {
    copy = [ ...points ]
    copy[selected] +=1
    setPoints(copy)
    console.log(copy)
    mostPoints()
  }
  const mostPoints = () => {
    let most = 0
    for (let i = 0; i < 6; i++) {
      if(copy[i] > most){
        most = copy[i]
        setMostIndex(i)
      }
    }
  }

  return (
      <div>
        <button onClick={setRandom}>New anecdote</button>
        <button onClick={addPoints}>Vote</button>
        <br/>
        <br/>
        {anecdotes[selected]}
        <br/>
        <br/>
        <p>Votes: {points[selected]}</p>
        <br/>
        <p>The anecdote with the most votes:</p>
        {anecdotes[mostIndex]}
      </div>
    )
}

export default App
