import axios from "axios"
const baseUrl = "/api/blogs"

let token = null
let config
const setToken = newToken => {
	token = `bearer ${newToken}`
	config = { headers: { authorization: token } }
}
const getAll = async () => {
	const request = await axios.get(baseUrl)
	return request.data /*.sort((a, b) => b.likes - a.likes )*/
}
const createNew = async blogInfo => {
	console.log(token)
	console.log(blogInfo)
	const request = await axios.post(baseUrl, blogInfo, config)
	return request.data
}
const like = async blog => {
	blog.likes = blog.likes + 1
	const request = await axios.put(`${baseUrl}/${blog.id}`, blog)
	return request.data
}
const comment = async blog => {
	const request = await axios.put(`${baseUrl}/${blog.id}`, blog)
	return request.data
}
const remove = async blog => {
	const request = await axios.delete(`${baseUrl}/${blog.id}`, config)
	return request.data
}

const exportObject = {
	getAll,
	setToken,
	createNew,
	like,
	comment,
	remove,
}

export default exportObject
