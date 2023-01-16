import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'this is a test',
  author: 'tester',
  url: 'http://localhost:3001/',
  likes: 12,
  user: '639c7a571a222f545aa3ff87'
}
const blogs = [{
  title: 'this is a test',
  author: 'tester',
  url: 'http://localhost:3001/',
  likes: 12,
  user: '639c7a571a222f545aa3ff87'
},
{
  title: 'this is also a test',
  author: 'testUser',
  url: 'http://localhost:3001/',
  likes: 1,
  user: '639c7a571a222f545aa3ff87'
}]
const user = { username: 'tester' }
let component
let mockHandler
let testUser
beforeEach(() => {
  testUser = userEvent.setup()
  mockHandler = jest.fn()
  const blogc = <Blog blog={blog} blogs={blogs} user={user} addLike={mockHandler}/>
  component = render(blogc)
})
afterEach(cleanup)
/*const mockHandler = jest.fn()
const component = <Blog blog={blog} blogs={blogs} user={user} toggleVisibility={mockHandler}/>
const element = render(component)*/

test('Blog component renders blog title', () => {
  const element = component.getByText('this is a test', { exact: false })
  expect(element).toBeDefined()
})
test('Url, likes and user data is rendered when blog is expanded', async () => {
  const button = component.getByText('view')

  await testUser.click(button)
  expect(component.container).toHaveTextContent('http://localhost:3001/' && '12' && 'tester')
})


test('if like is pressed twice, handler is called twice', async () => {
  //const likeButton = component.getByText('like')
  const viewButton = component.getByText('view')
  await testUser.click(viewButton)
  const likeButton = component.getByText('like')
  await testUser.click(likeButton)
  await testUser.click(likeButton)

  //expect(element).toHaveTextContent('http://localhost:3001/' && '12' && 'tester')
  expect(mockHandler.mock.calls).toHaveLength(2)
  //expect(mockHandler.mock.calls).toHaveLength(2)
})