import { useSelector, useDispatch } from 'react-redux'
import { setFilter,filterAnecdotes } from '../reducers/filterReducer'

const Filter = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdote)
    const handleChange = (event) => {
        const value = event.target.value
        const payload = {value: value, anecdotes:anecdotes}
        dispatch(filterAnecdotes(payload))

      // input-kentän arvo muuttujassa event.target.value
    }
    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }
  
  export default Filter