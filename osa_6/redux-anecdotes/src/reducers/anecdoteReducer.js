import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"
import{ setFilter, updateFilter } from "./filterReducer"
import { notifyAction } from "./notificationReducer"

const initialState = []
const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdotes (state, action) {
      state.push(action.payload)
    },
    updateAnecdotes (state, action) {
      const updatedAnecdote = action.payload
      return state.map(anecdote =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
      )     
    }
  }
})

export const { setAnecdotes, appendAnecdotes, updateAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAnecdotes()
    dispatch(setAnecdotes(anecdotes))
    dispatch(setFilter(anecdotes))
  }
}
export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch(appendAnecdotes(newAnecdote))
    dispatch(updateFilter())
    dispatch(notifyAction(`you added "${newAnecdote.content}"`,5000))
  }
}

export const voteAnecdote = (anecdote) => {
  const votedAnecdote = {
    ...anecdote, votes: anecdote.votes + 1
  }
  return async dispatch => {
    const newAnecdote = await anecdoteService.updateAnecdote(votedAnecdote)
    dispatch(updateAnecdotes(votedAnecdote))
    dispatch(updateFilter(newAnecdote))
    dispatch(notifyAction(`you voted "${newAnecdote.content}"`, 5000))
  }
}

export default anecdoteSlice.reducer
