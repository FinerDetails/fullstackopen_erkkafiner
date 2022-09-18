const Filter = ({newInput,handleInputChange}) => {
    return (
      <form>
        <input value={newInput} onChange={handleInputChange}></input>
      </form>
    )
  }

  export default Filter