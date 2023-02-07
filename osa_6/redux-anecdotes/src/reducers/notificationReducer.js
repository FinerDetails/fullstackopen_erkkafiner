import { createSlice } from "@reduxjs/toolkit"

const initialState = {text:'notification', style:{display:'none'}}

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setNotification(state, action) {
            const notification = action.payload
            if (!notification) {
                return initialState
            }
            return {text: notification, style:{
                border: 'solid',
                padding: 10,
                borderWidth: 1
              }}
        }
    }
})

export const {setNotification} = notificationSlice.actions
export const notifyAction = (text, time) => {
    return dispatch => {
        dispatch(setNotification(text))
        setTimeout(()=>{dispatch(setNotification())}, time)
    }
}
export default notificationSlice.reducer