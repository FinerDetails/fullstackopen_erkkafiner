import { useState } from "react"
import { useMutation } from "@apollo/client"
import { EDIT_AUTHOR } from "../queries"
import { ALL_AUTHORS } from "../queries"
const Author = ({ author, token }) => {
	if (author.born === null) {
		author.born = ""
	}
	const [born, setBorn] = useState(author.born)
	const [changeBorn] = useMutation(EDIT_AUTHOR, {
		refetchQueries: [{ query: ALL_AUTHORS }],
	})
	const submitChanges = event => {
		console.log(born)
		event.preventDefault()
		changeBorn({ variables: { name: author.name, born: born } })
	}
	return (
		<form onSubmit={submitChanges}>
			<table>
				<tbody>
					<tr>
						<td>name:</td>
						<td>{author.name}</td>
					</tr>

					<tr>
						<td>born:</td>
						<td>
							{token ? (
								<input
									type="number"
									value={born}
									placeholder="add birthyear"
									onChange={({ target }) => setBorn(Number(target.value))}
								/>
							) : !token && born ? (
								<p>{born}</p>
							) : (
								<p>unknown</p>
							)}
						</td>
					</tr>
					<tr>
						<td>books written:</td>
						<td>{author.bookCount}</td>
					</tr>
					<tr>
						<td>
							<button type="submit">Submit Changes</button>
						</td>
					</tr>
				</tbody>
			</table>
		</form>
	)
}

export default Author
