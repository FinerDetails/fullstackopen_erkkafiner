import { useState } from 'react'
import blogService from '../services/blogs'
const Blog = ({ blog, blogs, setBlogs, user, setMessage, addLike }) => {
  const [visible, setVisible] = useState(false)
  const toggleVisibility = () => {
    setVisible(!visible)
  }
  let visibleRemove = {
    display : 'none'
  }
  if(blog.user.username === user.username){
    visibleRemove = { display : '' }
  }

  const removeBlog = () => {
    if (window.confirm(`Remove Blog "${blog.title}"?`)){
      blogService.remove(blog)
        .then(() => {
          let updatedBlogs = blogs.filter(b => b.id !== blog.id)
          setBlogs(updatedBlogs)
          const m = {
            text: `Blog "${blog.title}" removed`,
            error: false
          }
          setMessage(m)
          setTimeout(() => {setMessage(null)}, 5000)
        })
    }
  }
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  if (visible) {
    return (
      <div style={blogStyle} className="expanded">
        &quot;{blog.title}&quot; by {blog.author} <button onClick={toggleVisibility}>hide</button>
        <br/>
        url: {blog.url}
        <br/>
        likes: {blog.likes} <button className="likeButton" onClick={addLike}>like</button>
        <br/>
        submitted by {blog.user.username}
        <br/>
        <button className="removeButton" style={visibleRemove} onClick={removeBlog}>remove</button>
      </div>
    )
  }
  else if (!visible){
    return (
      <div className="hidden" style={blogStyle}>
        &quot;{blog.title}&quot; by {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
    )
  }
}

export default Blog