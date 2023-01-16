import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddBlog from './AddBlog'

const mockHandler = jest.fn()
const user = userEvent.setup()
const component = render(<AddBlog createBlog={mockHandler}/>)
test('adding blog calls handleCreation with correct correct paramiters', async () => {
  //render(<AddBlog handleCreation={mockHandler}/>)
  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  await user.type(title, 'this is a test')
  await user.type(author, 'tester')
  await user.type(url, 'http://localhost:3001/')
  await user.click(component.getByText('Add Blog'))
  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0]).toBe('this is a test')
  expect(mockHandler.mock.calls[0][1]).toBe('tester')
  expect(mockHandler.mock.calls[0][2]).toBe('http://localhost:3001/')
})