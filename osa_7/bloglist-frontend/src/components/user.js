import { useParams } from "react-router-dom"

const User = ({ usersResult }) => {
	const userId = useParams().id
	if (usersResult.isLoading) {
		return <div>loading user...</div>
	}
	const users = usersResult.data

	const user = users.find(user => user.id === userId)
	return (
		<div className="text-center p-6 m-6 border-2 border-pink-900">
			<h2 className="text-xl p-2 text-center">{user.name}</h2>
			<ul className="inline-block text-left">
				<strong>added blogs</strong>
				{user.blogs.map(blog => {
					return (
						<li className="text-left" key={blog.id}>
							{blog.title}
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default User
