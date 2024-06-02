import { gql } from "@apollo/client"

export const ALL_AUTHORS = gql`
	query {
		allAuthors {
			name
			born
			bookCount
		}
	}
`
export const ALL_BOOKS = gql`
	query allBooks($author: String, $genre: String) {
		allBooks(author: $author, genre: $genre) {
			author {
				name
			}
			published
			title
			genres
		}
	}
`
export const ADD_BOOK = gql`
	mutation addBook(
		$title: String!
		$published: Int!
		$author: String!
		$genres: [String!]!
	) {
		addBook(
			title: $title
			published: $published
			author: $author
			genres: $genres
		) {
			title
			published
			author {
				name
			}
			genres
		}
	}
`
export const EDIT_AUTHOR = gql`
	mutation editAuthor($name: String!, $born: Int!) {
		editAuthor(name: $name, born: $born) {
			name
			born
		}
	}
`

export const LOGIN = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			value
		}
	}
`
export const ME = gql(`
	query{
		me{
			username
			favouriteGenre
		}
	}
`)

export const BOOK_ADDED = gql(`
subscription {
    bookAdded {
		title
		published
		author {
			name
		}
		genres
	}
    
  }
`)
