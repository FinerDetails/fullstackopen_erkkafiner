const { ApolloServer } = require("@apollo/server")
const {
	ApolloServerPluginDrainHttpServer,
} = require("@apollo/server/plugin/drainHttpServer")
const { expressMiddleware } = require("@apollo/server/express4")
const { makeExecutableSchema } = require("@graphql-tools/schema")

const { WebSocketServer } = require("ws")
const { useServer } = require("graphql-ws/lib/use/ws")
const mongoose = require("mongoose")

const http = require("http")
const express = require("express")
const cors = require("cors")

const jwt = require("jsonwebtoken")
const typeDefs = require("./typeDefs")
const resolvers = require("./resolvers")
const User = require("./models/User")
require("dotenv").config()
const MONGODB_URI = process.env.MONGODB_URI

mongoose.set("strictQuery", false)
mongoose
	.connect(MONGODB_URI)
	.then(() => {
		console.log(`connected to: ${MONGODB_URI}`)
	})
	.catch(error => {
		console.log(`error connecting to: ${MONGODB_URI}`, error.message)
	})

const start = async () => {
	const app = express()
	const httpServer = http.createServer(app)
	const wsServer = new WebSocketServer({
		server: httpServer,
		path: "/",
	})
	const schema = makeExecutableSchema({ typeDefs, resolvers })
	const serverCleanup = useServer({ schema }, wsServer)
	const server = new ApolloServer({
		schema,
		plugins: [
			ApolloServerPluginDrainHttpServer({ httpServer }),
			{
				async serverWillStart() {
					return {
						async drainServer() {
							await serverCleanup.dispose()
						},
					}
				},
			},
		],
	})
	await server.start()
	app.use(
		"/",
		cors(),
		express.json(),
		expressMiddleware(server, {
			context: async ({ req }) => {
				const auth = req ? req.headers.authorization : null
				if (auth && auth.startsWith("Bearer ")) {
					const decodedToken = jwt.verify(
						auth.substring(7),
						process.env.JWT_SECRET
					)
					const currentUser = await User.findById(decodedToken.id)
					return { currentUser }
				}
			},
		})
	)
	const PORT = 4001

	httpServer.listen(PORT, () =>
		console.log(`Server is now running on http://localhost:${PORT}`)
	)
}
start()
