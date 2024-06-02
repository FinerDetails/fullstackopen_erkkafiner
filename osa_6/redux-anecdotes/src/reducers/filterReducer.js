import { createSlice } from "@reduxjs/toolkit";
import { sendState } from "../App";


const initialState = []
const filterSlice = createSlice({
    name:'filters',
    initialState,
    reducers:{
        setFilter(state, action) {
            console.log(action.payload)
            return action.payload
        },
        filterAnecdotes(state, action) {
            const anecdotes = action.payload.anecdotes
            const filterValue = action.payload.value
            const filteredAnecdotes = anecdotes.filter(function(anecdote){
                console.log(filterValue.toLowerCase())
                return (anecdote.content.toLowerCase().indexOf(filterValue.toLowerCase()) !== -1)
            })
            return filteredAnecdotes
        }
    }
})
export const { setFilter, filterAnecdotes  } = filterSlice.actions
export const updateFilter = () => {
    const state = sendState().getState().anecdote;
    console.log(state)
    return dispatch => {
        dispatch(setFilter(state))
    }
}
export default filterSlice.reducer