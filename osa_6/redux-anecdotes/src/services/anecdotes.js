import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAnecdotes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}
const createAnecdote = async (content) => {
  const object = {content: content, votes: 0}
  const response = await axios.post(baseUrl, object)
  return response.data
}
const updateAnecdote = async (anecdote) => {
  const response = await axios.put(`${baseUrl}/${anecdote.id}`, anecdote)
  console.log(anecdote)
  return response.data
}

export default {getAnecdotes, createAnecdote, updateAnecdote}