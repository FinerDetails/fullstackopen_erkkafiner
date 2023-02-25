import { useState } from "react"
const AddBlog = ({ createBlog }) => {
	const [title, setTitle] = useState("")
	const [author, setAuthor] = useState("")
	const [url, setUrl] = useState("")

	const handleCreation = event => {
		event.preventDefault()
		createBlog(title, author, url)
	}

	return (
		<div className="text-center">
			<form onSubmit={handleCreation} className="p-6 m-6 bg-pink-100">
				<div>
					<input
						placeholder="title"
						className="border-b-2 border-pink-900 m-3"
						type="text"
						value={title}
						name="Title"
						onChange={({ target }) => setTitle(target.value)}
					/>
				</div>
				<div>
					<input
						placeholder="author"
						className="border-b-2 border-pink-900 m-3"
						type="text"
						value={author}
						name="Author"
						onChange={({ target }) => setAuthor(target.value)}
					/>
				</div>
				<div>
					<input
						placeholder="url"
						className="border-b-2 border-pink-900 m-3"
						type="text"
						value={url}
						name="Url"
						onChange={({ target }) => setUrl(target.value)}
					/>
				</div>
				<button
					className="p-6 rounded-full bg-indigo-900 text-white"
					type="submit"
				>
					Add Blog
				</button>
			</form>
		</div>
	)
}
export default AddBlog
