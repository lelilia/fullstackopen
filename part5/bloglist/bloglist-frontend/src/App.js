import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Loggedin from './components/Loggedin'
import Notification from './components/Notification'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Wrong credentials')
      
    }
  }

  const handleTitleChange = (event) => setNewTitle(event.target.value)

  const handleAuthorChange = (event) => setNewAuthor(event.target.value)

  const handleUrlChange = (event) => setNewUrl(event.target.value)

  const addBlog = (event) => {
    event.preventDefault()
    const newBlogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    blogService
      .create(newBlogObject)
      .then(returnedBlog => {
        displayMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added.`)
        setBlogs(blogs.concat(returnedBlog))
      })
      .catch(error => {
        console.log("tst",error.message)
        displayMessage(error.message, "red")

      })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const displayMessage = (message, color = "green") => {
    setNotificationMessage({ message, color })
    setTimeout(() => setNotificationMessage(null), 5000)
  }

  return (
    <div>
      <Notification notification ={notificationMessage} />
      {user === null ?
        <LoginForm 
          username = {username} 
          setUsername =  {setUsername} 
          handleLogin = {handleLogin} 
          password = {password}
          setPassword = {setPassword}
        /> :
        <Loggedin
          user = {user}
          handleLogout = {handleLogout}
          blogs = {blogs}
          newTitle = {newTitle}
          handleTitleChange = {handleTitleChange}
          newAuthor = {newAuthor}
          handleAuthorChange = {handleAuthorChange}
          newUrl = {newUrl}
          handleUrlChange = {handleUrlChange}
          addBlog = {addBlog}
        />
      }
    </div>
  )
}

export default App