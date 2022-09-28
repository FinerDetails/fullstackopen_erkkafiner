import axios from 'axios'
const url = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(url)
  return request.then(response => response.data)
}

const create = newPerson => {
  const request = axios.post(url, newPerson)
  return request.then(response => response.data)
}

const erase = (id) => {
  const request = axios.delete(`${url}/${id}`)
  return request.then()
}

const replace = (id, newPerson) => {
  const request = axios.put(`${url}/${id}`,newPerson)
  return request.then()
}
export default { getAll, create , erase, replace}