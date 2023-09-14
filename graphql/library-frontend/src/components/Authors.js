import { useQuery } from "@apollo/client"
import { Link } from "react-router-dom"
import { ALL_AUTHORS } from "../queries"
const Authors = ({ setAuthor }) => {
	const authors = useQuery(ALL_AUTHORS)
	if (authors.loading) {
		return <div>loading...</div>
	}
	console.log(authors.data.allAuthors)
	return (
		<>
			<h2>authors</h2>
			<table>
				<tbody>
					<tr>
						<th></th>
						<th>born</th>
						<th>books</th>
					</tr>
					{authors.data.allAuthors.map(a => (
						<tr key={a.name}>
							<td>
								{
									<Link
										onClick={() => {
											setAuthor(a)
										}}
										to={`/authors/${a.name}`}
									>
										{a.name}
									</Link>
								}
							</td>
							<td>{a.born}</td>
							<td>{a.bookCount}</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}

export default Authors
