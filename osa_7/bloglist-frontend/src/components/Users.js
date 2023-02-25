import { Link } from "react-router-dom"
const Users = ({ usersResult }) => {
	if (usersResult.isLoading) {
		return <div>loading users...</div>
	}
	const users = usersResult.data
	return (
		<>
			<table className="p-6 m-6 border-2 border-pink-900">
				<tbody>
					<tr>
						<th className="p-6">name</th>
						<th className="p-6">blogs created</th>
					</tr>
					{users.map(user => {
						return (
							<tr key={user.id}>
								<td className="text-center">
									<Link
										className="m-2 p-4 hover:bg-pink-100 rounded-full"
										to={`/users/${user.id}`}
									>
										{user.name}
									</Link>
								</td>
								<td className="text-center p-6">{user.blogs.length}</td>
							</tr>
						)
					})}
				</tbody>
			</table>
		</>
	)
}

export default Users
