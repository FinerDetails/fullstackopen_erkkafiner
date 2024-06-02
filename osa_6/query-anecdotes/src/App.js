import { useQuery, useQueryClient, useMutation } from 'react-query'
import { useReducer } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { getAnecdotes } from './services/anecdotes'
import { updateAnecdote } from './services/anecdotes'
import NotificationContext from './NotificationContext'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'VOTE':
      return `you voted "${action.payload}"`
    case 'CREATE':
      return `"${action.payload}" created`
    case 'ERROR':
      return action.payload
    default:
      return null
  }
}

const App = () => {

  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(updateAnecdote,{
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const handleVote = (anecdote) => {
    newAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes +1})
    notificationDispatch({
      type: 'VOTE',
      payload: anecdote.content
    })
    setTimeout(()=>{notificationDispatch({type: 'DEFAULT'})}, 5000)
  }

  const result = useQuery(
    'anecdotes', getAnecdotes, 
    {
      retry: false
    }
  )
  console.log(result)

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  else if ( result.isError ) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      <div>
        <h3>Anecdote app</h3>
      
        <Notification />
        <AnecdoteForm />
      
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
      </div>
    </NotificationContext.Provider>
  )
}

export default App
