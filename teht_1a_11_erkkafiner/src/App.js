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
    <Part part={data.parts[0].name} exercises={data.parts[0].exercises}/>
    <Part part={data.parts[1].name} exercises={data.parts[1].exercises}/>
    <Part part={data.parts[2].name} exercises={data.parts[2].exercises}/>
  </div>
  )
}
const Total = (data) =>{
  return (
  <div>
    <p>Number of exercises {data.parts[0].exercises + data.parts[1].exercises + data.parts[2].exercises}</p>
  </div>
  )
}
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
    {
        name: 'Fundamentals of React',
        exercises: 10
    },
    {
        name: 'Using props to pass data',
        exercises: 7
    },
    {
        name: 'State of a component',
        exercises: 14
    }
  ]
}

  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>

    </div>
  )
}


export default App