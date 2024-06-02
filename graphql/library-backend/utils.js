const { GraphQLError } = require("graphql")
const getOne = async (model, obj) => {
	try {
		console.log(`getOne(${model.modelName})`)
		return await model.findOne(obj)
	} catch (error) {
		const value = Object.keys(obj)[0]
		throw new GraphQLError(`Failed getting ${obj} from ${model.modelName}s`, {
			extensions: {
				code: "BAD_USER_INPUT",
				invalidArgs: value,
				error,
			},
		})
	}
}
const getAll = async model => {
	try {
		console.log(`getAll(${model.modelName})`)
		return await model.find({})
	} catch (error) {
		throw new GraphQLError(`Failed getting ${model.modelName}s`, {
			extensions: {
				code: "NOT_FOUND",
				error,
			},
		})
	}
}
const saveData = async (saveable, args) => {
	try {
		console.log(`saveData(${saveable.modelName})`)
		return await saveable.save()
	} catch (error) {
		if (error.name === "ValidationError") {
			throw new GraphQLError(`Inputted data is not valid`, {
				extensions: {
					code: "BAD_USER_INPUT",
					invalidArgs: args,
					error,
				},
			})
		} else {
			throw new GraphQLError(`Saving failed`, {
				extensions: {
					code: "NOT_FOUND",
				},
			})
		}
	}
}
const checkAuthorization = currentUser => {
	console.log("checkAuthorization()")
	if (!currentUser) {
		throw new GraphQLError("Not authenticated", {
			extensions: {
				code: "UNAUTHORIZED",
			},
		})
	}
}

module.exports = {
	getOne,
	getAll,
	saveData,
	checkAuthorization,
}
