import { createContext, useContext, useReducer } from "react"
import { useQuery } from "react-query"
import blogService from "./services/blogs"

const messageReducer = (state, action) => {
	switch (action.type) {
		case "INFORM":
			return { text: action.payload, error: false }
		case "ERROR":
			return { text: action.payload, error: true }
		default:
			return null
	}
}
const userReducer = (state, action) => {
	switch (action.type) {
		case "SET":
			return action.payload
		default:
			return null
	}
}

const Context = createContext()

export const ContextProvider = props => {
	const blogsResult = useQuery("blogs", blogService.getAll)
	const [message, messageDispatch] = useReducer(messageReducer, null)
	const [user, userDispatch] = useReducer(userReducer, null)

	return (
		<Context.Provider
			value={[message, messageDispatch, user, userDispatch, blogsResult]}
		>
			{props.children}
		</Context.Provider>
	)
}

export const useMessageValue = () => {
	const context = useContext(Context)
	return context[0]
}
export const useMessageDispatch = () => {
	const context = useContext(Context)
	return context[1]
}
export const useBlogsResult = () => {
	const context = useContext(Context)
	return context[4]
}

export default Context
