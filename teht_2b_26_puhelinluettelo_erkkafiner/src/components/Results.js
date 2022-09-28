const Results = ({person, deleteInfo}) => {
    return <li><button onClick={deleteInfo}>delete</button>{person.name}: {person.number}</li>
  } 

  export default Results