import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    anecdote: anecdoteReducer,
    filter: filterReducer
  }
})

  export default store