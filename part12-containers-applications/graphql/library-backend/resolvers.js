const { getOne, getAll, saveData, checkAuthorization } = require("./utils")
const jwt = require("jsonwebtoken")
const Author = require("./models/Author")
const User = require("./models/User")
const Book = require("./models/Book")
const { GraphQLError } = require("graphql")
const { PubSub } = require("graphql-subscriptions")
const pubsub = new PubSub()

require("dotenv").config()
const PASSWORD = process.env.PASSWORD
const resolvers = {
	Book: {
		author: async root => {
			return getOne(Author, { _id: root.author })
		},
	},
	Query: {
		bookCount: async () => Book.collection.countDocuments(),
		authorCount: async () => Author.collection.countDocuments(),
		allBooks: async (root, args) => {
			const books = await getAll(Book)
			if (args.author) {
				const author = await getOne(Author, { name: args.author })
				const authorID = author.get("_id")
				const booksFilteredByAuthor = books.filter(book =>
					book.author.equals(authorID)
				)
				if (args.genre) {
					return booksFilteredByAuthor.filter(book =>
						book.genres.includes(args.genre)
					)
				}
				return booksFilteredByAuthor
			} else if (!args.author && args.genre) {
				return books.filter(book => book.genres.includes(args.genre))
			}
			return books
		},
		allAuthors: async () => {
			return getAll(Author)
		},
		me: (root, args, { currentUser }) => {
			return currentUser
		},
	},
	Mutation: {
		addBook: async (root, args, { currentUser }) => {
			checkAuthorization(currentUser)
			let existingAuthor = await getOne(Author, { name: args.author })
			if (!existingAuthor) {
				const newAuthor = new Author({ name: args.author, bookCount: 0 })
				await saveData(newAuthor, args.author)
				existingAuthor = newAuthor
			}
			const newBook = new Book({ ...args, author: existingAuthor._id })
			await saveData(existingAuthor, {
				...args,
				bookCount: existingAuthor.bookCount + 1,
			})
			pubsub.publish("BOOK_ADDED", { bookAdded: newBook })
			return saveData(newBook, args)
		},
		editAuthor: async (root, args, { currentUser }) => {
			checkAuthorization(currentUser)
			const existingAuthor = await getOne(Author, { name: args.name })
			if (existingAuthor) {
				existingAuthor.set(args)
				await saveData(existingAuthor, args)
				return existingAuthor
			}
			return null
		},
		createUser: async (root, args) => {
			const newUser = new User({
				username: args.username,
				favouriteGenre: args.favouriteGenre,
			})
			return saveData(newUser, args)
		},
		login: async (root, args) => {
			if (!args.username || args.password !== PASSWORD) {
				throw new GraphQLError("wrong credentials", {
					extensions: {
						code: "BAD_USER_INPUT",
					},
				})
			}
			try {
				const user = await getOne(User, { username: args.username })
				const userForToken = {
					username: user.username,
					id: user._id,
				}
				return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
			} catch (error) {
				throw new GraphQLError("user doesn't exist", {
					extensions: {
						code: "BAD_USER_INPUT",
					},
				})
			}
		},
	},
	Subscription: {
		bookAdded: {
			subscribe: () => pubsub.asyncIterator("BOOK_ADDED"),
		},
	},
}

module.exports = resolvers
