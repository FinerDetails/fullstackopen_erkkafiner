import { useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { useMessageDispatch } from "../Context"

const Blog = ({
	blog,
	removeBlogMutation,
	newCommentMutation,
	user,
	newLikeMutation,
	visible,
}) => {
	const [comment, setComment] = useState("")
	const messageDispatch = useMessageDispatch()
	const userId = useParams().id
	const navigate = useNavigate()
	if (blog.isLoading) {
		return <div>loading blog...</div>
	}
	let visibleRemove = {
		display: "none",
	}

	if (visible) {
		const blogs = blog.data
		blog = blogs.find(blog => blog.id === userId)
		if (blog.user.username === user.username) {
			visibleRemove = { display: "" }
		}
		const addLike = event => {
			event.preventDefault()
			newLikeMutation.mutate(blog)
		}
		const handleComment = event => {
			event.preventDefault()
			blog.comments.push(comment)
			newCommentMutation.mutate(blog)
		}
		const removeBlog = () => {
			if (window.confirm(`Remove Blog "${blog.title}"?`)) {
				navigate("/")
				removeBlogMutation.mutate(blog)
				messageDispatch({
					type: "INFORM",
					payload: `Blog "${blog.title}" removed`,
				})
				setTimeout(() => {
					messageDispatch({ type: "DEFAULT" })
				}, 5000)
			}
		}
		return (
			<div className="inline-block p-6 m-6 bg-pink-100">
				&quot;{blog.title}&quot; by {blog.author}
				<br />
				url: {blog.url}
				<br />
				likes: {blog.likes}{" "}
				<button className="likeButton" onClick={addLike}>
					like
				</button>
				<br />
				submitted by {blog.user.username}
				<br />
				<br></br>
				<button
					className="px-3 py-2 font-semibold rounded-full bg-indigo-900 text-white"
					style={visibleRemove}
					onClick={removeBlog}
				>
					remove
				</button>
				<br />
				<br></br>
				<strong>comments</strong>
				<br />
				{blog.comments.map(comment => {
					return <li key={Math.floor(Math.random() * 1000000)}>{comment}</li>
				})}
				<form onSubmit={handleComment}>
					<input
						placeholder="comment"
						className="border-b-2 border-pink-900 m-3"
						type="text"
						value={comment}
						name="Comment"
						onChange={({ target }) => setComment(target.value)}
					/>
					<button
						className="inline-block px-3 py-2 font-semibold rounded-full bg-indigo-900 text-white"
						type="submit"
					>
						add
					</button>
				</form>
			</div>
		)
	} else if (!visible) {
		return (
			<div className="m-2 p-4 hover:bg-pink-100 rounded-full">
				<Link className="p-4 text-pink-900" to={`/blogs/${blog.id}`}>
					&quot;{blog.title}&quot; by {blog.author}
				</Link>{" "}
			</div>
		)
	}
}

export default Blog
