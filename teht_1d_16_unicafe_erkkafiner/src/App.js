import { useState } from 'react'

const Button = (props) => {
  return(
    <>
      <button onClick={() => props.setGood(props.good + 1)}>Good</button>
      <button onClick={() => props.setNeutral(props.neutral + 1)}>Neutral</button>
      <button onClick={() => props.setBad(props.bad + 1)}>Bad</button>
    </>
  )
}

const Statistics = (props) => {
  let all = props.good + props.neutral + props.bad
  let avg = (props.good - props.bad) / all
  let pos_pros = (props.good / all)*100
  if(all === 0) {
    return(
      <>
        <p>No Feedback given!</p>
      </>
    )
  }
  else {
    return(
      <>
        <table>
          <tbody>
            <StatisticLine text="Good:" value={props.good}/>
            <StatisticLine text="Neutral:" value={props.neutral}/>
            <StatisticLine text="Bad:" value={props.bad}/>
            <StatisticLine text="All:" value={all}/>
            <StatisticLine text="Average:" value={avg}/>
            <StatisticLine text="Positive:" value={pos_pros+"%"}/>
          </tbody>
        </table>
      </>
    )

  }
}

const StatisticLine = (props) => {
  return(
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  return (
    <>
      <h2>Give Feedback:</h2>
      <Button good={good} neutral={neutral} bad={bad} setGood={setGood} setNeutral={setNeutral} setBad={setBad}/>
      <br/>
      <h2>Statistics:</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

export default App
