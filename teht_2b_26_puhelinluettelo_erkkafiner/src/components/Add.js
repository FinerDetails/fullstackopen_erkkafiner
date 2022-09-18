const Add = ({addInfo, newName,handleNameChange,newNumber,handleNumberChange}) => {
    return(
      <form onSubmit={addInfo}>
        <h3>Add new contact</h3>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
          <br/>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
  }
  
  export default Add