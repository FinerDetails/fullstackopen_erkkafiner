const Header = (data) =>{
  return (
  <div>
    <h1>{data.course}</h1>
  </div>
  )
}
const Part = (data) =>{
  return (
    <div>
      <p>
        {data.part} {data.exercises}
      </p>
    </div>
    )
}
const Content = (data) =>{
  return (
  <div>
    <Part part={data.part1} exercises={data.exercises1}/>
    <Part part={data.part2} exercises={data.exercises2}/>
    <Part part={data.part3} exercises={data.exercises3}/>
  </div>
  )
}
const Total = (data) =>{
  return (
  <div>
    <p>Number of exercises {data.exercises1 + data.exercises2 + data.exercises3}</p>
  </div>
  )
}
const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content part1={part1} part2={part2} part3={part3} exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}/>
      <Total exercises1={exercises1} exercises2={exercises2} exercises3={exercises3}/>
    </div>
  )
}


export default App