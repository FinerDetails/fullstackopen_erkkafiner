const Header = (data) =>{
    return (
    <>
      <h3>{data.course}</h3>
    </>
    )
  }
  const Part = ({ part }) =>{
    return (
        <p>
          {part.name} {part.exercises}
        </p>
      )
  }
  const Content = ({ parts }) =>{
    return (
        <>
          {parts.map
            (part =>
              <Part key={part.id} part={part}/>
            )
          }
        </>
      )
  }
  const Total = ({ parts }) =>{
    return (
    <>
      <b>
        Number of exercises {parts.reduce((sum, total) => sum + total.exercises, 0)}
      </b>
    </>
    )
  }
  const Course = ( {course} ) => {
    return (
      <>
        <Header course={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
      </>
    )
  }

  export default Course