import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import { ME } from "../queries"

const Recommend = () => {
	const userQuery = useQuery(ME)
	const filteredBooksQuery = useQuery(ALL_BOOKS, {
		variables: { genre: userQuery.data?.me?.favouriteGenre },
	})
	if (userQuery.loading || filteredBooksQuery.loading) {
		return <div>loading...</div>
	}
	const favouriteGenre = userQuery.data.me.favouriteGenre
	const filteredBooks = filteredBooksQuery.data.allBooks
	return (
		<div>
			<h2>Recommendations</h2>

			<p>
				books in your favourite genre <b>{favouriteGenre}</b>
			</p>
			<table>
				<tbody>
					{filteredBooks.map(a => (
						<tr key={a.title}>
							<td>{a.title}</td>
							<td>{a.author.name}</td>
							<td>{a.published}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}

export default Recommend
