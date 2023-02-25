import { useState, useEffect, useRef, useContext } from "react"
import { useMutation, useQuery, useQueryClient } from "react-query"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import Blogs from "./components/Blogs"
import Blog from "./components/Blog"
import loginService from "./services/login"
import blogService from "./services/blogs"
import userService from "./services/users"
import Context from "./Context"
import Notification from "./components/Notification"
import Login from "./components/Login"
import AddBlog from "./components/AddBlog"
import Togglable from "./components/Togglable"
import Users from "./components/Users"
import User from "./components/user"

const App = () => {
	const [message, messageDispatch, user, userDispatch, blogsResult] =
		useContext(Context)
	//for handling login form
	const [username, setUsername] = useState("")
	const [password, setPassword] = useState("")

	const addBlogRef = useRef()
	useEffect(() => {
		const loggedUserJSON = window.localStorage.getItem("loggedUser")
		if (loggedUserJSON) {
			const user = JSON.parse(loggedUserJSON)
			userDispatch({
				type: "SET",
				payload: user,
			})
			blogService.setToken(user.token)
		}
	}, [])
	const queryClient = useQueryClient()
	const usersResult = useQuery("users", userService.getAll)
	const newBlogMutation = useMutation(blogService.createNew, {
		onSuccess: () => {
			queryClient.invalidateQueries("blogs")
		},
	})
	const newLikeMutation = useMutation(blogService.like, {
		onSuccess: () => {
			queryClient.invalidateQueries("likes")
		},
	})
	const newCommentMutation = useMutation(blogService.comment, {
		onSuccess: () => {
			queryClient.invalidateQueries("likes")
		},
	})
	const removeBlogMutation = useMutation(blogService.remove, {
		onSuccess: () => {
			queryClient.invalidateQueries("blogs")
		},
	})

	const createBlog = async (title, author, url) => {
		try {
			await newBlogMutation.mutate({
				title,
				author,
				url,
			})
			messageDispatch({
				type: "INFORM",
				payload: `"${title}" created`,
			})
			setTimeout(() => {
				messageDispatch({ type: "DEFAULT" })
			}, 5000)
			addBlogRef.current.toggleVisibility()
		} catch (e) {
			messageDispatch({
				type: "ERROR",
				payload: e.message.toString(),
			})
			setTimeout(() => {
				messageDispatch({ type: "DEFAULT" })
			}, 5000)
		}
	}
	const handleLogin = async event => {
		event.preventDefault()
		try {
			const user = await loginService.login({
				username,
				password,
			})
			console.log(user)
			window.localStorage.setItem("loggedUser", JSON.stringify(user))
			blogService.setToken(user.token)
			userDispatch({
				type: "SET",
				payload: user,
			})
			setUsername("")
			setPassword("")
		} catch (e) {
			messageDispatch({
				type: "ERROR",
				payload: "Incorrect credentials",
			})
			setTimeout(() => {
				messageDispatch({ type: "DEFAULT" })
			}, 5000)
		}
	}
	const handleLogout = event => {
		event.preventDefault()
		userDispatch({
			type: "DEFAULT",
		})
		messageDispatch({
			type: "INFORM",
			payload: "Logged out",
		})
		setTimeout(() => {
			messageDispatch({ type: "DEFAULT" })
		}, 5000)
		window.localStorage.removeItem("loggedUser")
	}
	if (user === null) {
		return (
			<>
				<Notification />
				<Login
					handleLogin={handleLogin}
					username={username}
					setUsername={setUsername}
					password={password}
					setPassword={setPassword}
				/>
			</>
		)
	}

	return (
		<div>
			<Notification />
			<Router>
				<nav className="p-6 text-xl text-white bg-pink-900">
					<Link className="p-6" to="/users">
						Users
					</Link>
					<Link className="p-6" to="/">
						Blogs
					</Link>
					<p className="text-sm italic inline-block mx-3">
						logged in as {user.username}{" "}
						<button onClick={handleLogout}>logout</button>
					</p>
				</nav>
				<Routes>
					<Route
						path="/"
						element={
							<>
								<Blogs
									newLikeMutation={newLikeMutation}
									newCommentMutation={newCommentMutation}
									removeBlogMutation={removeBlogMutation}
									user={user}
								/>
								<Togglable buttonLabel="Add blog" ref={addBlogRef}>
									<AddBlog createBlog={createBlog} />
								</Togglable>
							</>
						}
					/>
					<Route path="/users" element={<Users usersResult={usersResult} />} />
					<Route
						path="/users/:id"
						element={<User usersResult={usersResult} />}
					/>
					<Route
						path="blogs/:id"
						element={
							<Blog
								blog={blogsResult}
								removeBlogMutation={removeBlogMutation}
								newLikeMutation={newLikeMutation}
								newCommentMutation={newCommentMutation}
								user={user}
								visible={true}
							/>
						}
					/>
				</Routes>
			</Router>
			<br />
		</div>
	)
}

export default App
