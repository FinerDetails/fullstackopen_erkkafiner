const Books = ({ filter, setFilter, allBooks, filteredBooks }) => {
	if (allBooks.loading || filteredBooks.loading) {
		return <div>loading...</div>
	}
	const allGenres = allBooks.data.allBooks.reduce((genres, book) => {
		book.genres.forEach(genre => {
			if (!genres.includes(genre)) {
				genres.push(genre)
			}
		})
		return genres
	}, [])
	return (
		<div>
			<h2>books</h2>
			<br />
			{filter ? <h3>Filter: {filter}</h3> : <h3>Filter</h3>}
			{allGenres.map(genre => (
				<button onClick={() => setFilter(genre)} key={genre}>
					{genre}
				</button>
			))}
			<button onClick={() => setFilter(null)}>reset filter</button>
			<br />
			<br />
			<br />
			<table>
				<tbody>
					<tr>
						<th>title</th>
						<th>author</th>
						<th>published</th>
					</tr>

					{filteredBooks.data.allBooks.map(a => (
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

export default Books
