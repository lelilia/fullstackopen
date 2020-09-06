import React, { useState, useEffect, useRef } from 'react'
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

  const blogFormRef = useRef()
  
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
    } 
    catch (exception) {
      console.log('Wrong credentials')
      displayMessage("wrong username or password", "red")
      
    }
  }


  const addBlog = (newBlogObject) => {
    
    blogService
    .create(newBlogObject)
    .then(returnedBlog => {
      blogFormRef.current.toggleVisibility()
      displayMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added.`)
      setBlogs(blogs.concat(returnedBlog))
    })
    .catch(error => {
      displayMessage(error.response.data.error, "red")

    })
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    setUser(null)
    displayMessage(`${user.name} sucessfully logged out.`)
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
          blogs = {blogs}
          createBlog = {addBlog}
          handleLogout = {handleLogout}
          blogFormRef = {blogFormRef}
        />
      }
    </div>
  )
}

export default App