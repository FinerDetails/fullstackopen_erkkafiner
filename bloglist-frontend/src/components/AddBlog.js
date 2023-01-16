import { useState } from 'react'
const AddBlog = ({ createBlog }) => {

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreation = (event) => {
    event.preventDefault()
    createBlog(title, author, url)
  }

  return(
    <div>
      <h2>Add New Blog</h2>
      <form onSubmit={handleCreation}>
        <div>
            title:
          <input
            type="text"
            value={title}
            name="Title"
            className="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
            author:
          <input
            type="text"
            value={author}
            name="Author"
            className="author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
            url:
          <input
            type="text"
            value={url}
            name="Url"
            className="url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button className="addBlogButton" type="submit">Add Blog</button>
      </form>
    </div>
  )
}
export default AddBlog