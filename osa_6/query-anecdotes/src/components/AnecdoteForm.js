import { useMutation, useQueryClient } from 'react-query'
import { useContext } from 'react'
import { postAnecdote } from '../services/anecdotes'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)

  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(postAnecdote,{
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
    onError: () => {
      notificationDispatch({
        type: 'ERROR',
        payload: 'too short anecdote, must have length 5 or more'
      })
    }
  })
  
  const onCreate = (event) => {
    event.preventDefault()
    const input = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content: input, votes: 0})
    notificationDispatch({
      type: 'CREATE',
      payload: input
    })
    setTimeout(()=>{notificationDispatch({type: 'DEFAULT'})}, 5000)
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
