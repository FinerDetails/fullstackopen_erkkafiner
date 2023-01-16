import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import loginService from './services/login'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Login from './components/Login'
import AddBlog from './components/AddBlog'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)



  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])


  const createBlog = async (title, author, url) => {
    try {
      await blogService.createNew({
        title, author, url
      })
      const blogs = await blogService.getAll()
      setBlogs( blogs )
      //throw new Error("Failed in another way");
      const m = {
        text: 'New Blog Added',
        error: false
      }
      setMessage(m)
      setTimeout(() => {setMessage(null)}, 5000)
      addBlogRef.current.toggleVisibility()
    }
    catch (e) {
      const m = {
        text: (e.message).toString(),
        error: true
      }
      setMessage(m)
      setTimeout(() => {setMessage(null)}, 5000)
    }
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')

    } catch (e) {
      const m = {
        text: 'incorrect credentials',
        error: true
      }
      setMessage(m)
      setTimeout(() => {setMessage(null)}, 5000)
    }
  }
  const handleLogout = (event) => {
    event.preventDefault()
    setUser(null)
    const m = {
      text: 'Logged out',
      error: false
    }
    setMessage(m)
    setTimeout(() => {setMessage(null)}, 5000)
    window.localStorage.removeItem(
      'loggedUser'
    )
  }
  const addBlogRef = useRef()

  /*const addLike = () => {
    const found = blogs.find(b => b.id === Blog.blog.id)
    blogService.like(Blog.blog)
      .then((updatedBlog) => {
        found.likes = updatedBlog.likes
        let updatedBlogs = [...blogs]
        setBlogs(updatedBlogs)
      })
  }*/


  if (user === null) {
    return (
      <>
        <Notification message={message} />
        <Login handleLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword}/>
      </>
    )
  }


  return (
    <div id="blogs">
      <Notification message={message} />
      <p>logged in as {user.username} <button onClick={handleLogout}>logout</button></p>
      <h2>blogs</h2>
      {blogs.sort((a, b) => b.likes - a.likes ).map(blog => {
        const addLike = () => {
          const found = blogs.find(b => b.id === blog.id)
          blogService.like(blog)
            .then((updatedBlog) => {
              found.likes = updatedBlog.likes
              let updatedBlogs = [...blogs]
              setBlogs(updatedBlogs)
            })
        }
        return(
          <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} user={user} setMessage={setMessage} addLike={addLike}/>
        )
      })}
      <br/>
      <Togglable buttonLabel="Add blog" ref={addBlogRef}>
        <AddBlog createBlog={createBlog}/>
      </Togglable>
    </div>
  )
}

export default App