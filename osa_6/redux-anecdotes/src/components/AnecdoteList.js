import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    
    const filteredAnecdotes = useSelector(state => state.filter)
    const dispatch = useDispatch()
  
    const vote = (anecdote) => {
      dispatch(voteAnecdote(anecdote))
    }
    
   //console.log(filteredAnecdotes)
    return(
        <>
            {filteredAnecdotes.slice().sort((a,b) => b.votes - a.votes ).map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList