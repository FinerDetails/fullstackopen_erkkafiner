import { useBlogsResult } from "../Context"
import Blog from "./Blog"

const Blogs = ({ newLikeMutation, removeBlogMutation, user }) => {
	const blogsResult = useBlogsResult()
	if (blogsResult.isLoading) {
		return <div>loading blogs...</div>
	}
	const blogs = blogsResult.data

	return (
		<>
			{blogs
				.sort((a, b) => b.likes - a.likes)
				.map(blog => {
					return (
						<Blog
							key={blog.id}
							blog={blog}
							removeBlogMutation={removeBlogMutation}
							user={user}
							newLikeMutation={newLikeMutation}
						/>
					)
				})}
		</>
	)
}

export default Blogs
