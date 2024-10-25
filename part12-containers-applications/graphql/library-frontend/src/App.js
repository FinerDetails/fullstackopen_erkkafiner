import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	Navigate,
} from "react-router-dom"
import { useState } from "react"
import { useApolloClient, useSubscription, useQuery } from "@apollo/client"
import Authors from "./components/Authors"
import Author from "./components/Author"
import Books from "./components/Books"
import NewBook from "./components/NewBook"
import Recommend from "./components/Recommend"
import Login from "./components/Login"
import { ALL_BOOKS, BOOK_ADDED } from "./queries"

const App = () => {
	const [author, setAuthor] = useState("")
	const [filter, setFilter] = useState(null)
	const filteredBooks = useQuery(ALL_BOOKS, { variables: { genre: filter } })
	const allBooks = useQuery(ALL_BOOKS, { variables: { genre: null } })
	const [token, setToken] = useState(localStorage.getItem("library-user-token"))
	const logout = () => {
		localStorage.removeItem("library-user-token")
		setToken(null)
	}
	const client = useApolloClient()
	useSubscription(BOOK_ADDED, {
		onData: ({ data }) => {
			const addedBook = data.data.bookAdded
			window.alert(`new book: ${addedBook.title} added`)

			client.cache.updateQuery(
				{ query: ALL_BOOKS, variables: { genre: null } },
				({ allBooks }) => {
					console.log(allBooks)
					return {
						allBooks: allBooks.concat(addedBook),
					}
				}
			)
		},
	})

	return (
		<Router>
			<>
				<Link to="/">
					<button>Authors</button>
				</Link>
				<Link to="/Books">
					<button>Books</button>
				</Link>
				{token ? (
					<>
						<Link to="/NewBook">
							<button>Add Book</button>
						</Link>
						<Link to="/Recommend">
							<button>Recommend</button>
						</Link>
						<button onClick={logout}>Logout</button>
					</>
				) : (
					<Link to="/Login">
						<button>Login</button>
					</Link>
				)}
			</>
			<Routes>
				<Route path="/authors" element={<Authors setAuthor={setAuthor} />} />
				<Route
					path="/books"
					element={
						<Books
							setFilter={setFilter}
							filter={filter}
							filteredBooks={filteredBooks}
							allBooks={allBooks}
						/>
					}
				/>
				<Route path="/newBook" element={<NewBook />} />
				<Route path="/" element={<Navigate to="/authors" />} />
				<Route
					path="/authors/*"
					element={<Author author={author} token={token} />}
				/>
				<Route path="/recommend" element={<Recommend />} />
				<Route path="/login" element={<Login setToken={setToken} />} />
			</Routes>
		</Router>
	)
}

export default App
