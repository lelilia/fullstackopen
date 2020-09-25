import React, { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Loggedin from './components/Loggedin'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux'
import { initializeBlogs, showNotificationWithTimeOut } from './actionTypes'
import store from './store'

import './App.css'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeBlogs())
  },[dispatch])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  //const [user, setUser] = useState(null)

  const blogFormRef = useRef()


  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      dispatch({
        type: 'LOGIN',
        data: user
      })
      blogService.setToken(user.token)
      //setUser(user)
      setUsername('')
      setPassword('')
      dispatch(showNotificationWithTimeOut({
        text: `${user.name} succesfully logged in`,
        color: 'green'
      },10))
    }
    catch (exception) {
      console.log('Wrong credentials')
      dispatch(showNotificationWithTimeOut({
        text: 'wrong username or password',
        color: 'red'
      },10))

    }
  }


  const handleLogout = async (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    //setUser(null)
    dispatch(showNotificationWithTimeOut({
      text: `${store.getState().user.name} sucessfully logged out.`,
      color: 'green'
    },10))
    dispatch({
      type: 'LOGOUT',
      data: null
    })
  }



  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      //setUser(user)
      dispatch({
        type: 'LOGIN',
        data: user
      })
      blogService.setToken(user.token)
    }
  }, [dispatch])

  const user = store.getState().user
  console.log('user', user === '')
  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      {user === '' ?
        <LoginForm
          username={username}
          setUsername={setUsername}
          handleLogin={handleLogin}
          password={password}
          setPassword={setPassword}
        /> :
        <Loggedin
          user={user}
          handleLogout={handleLogout}
          blogFormRef={blogFormRef}
        />
      }
    </div>
  )
}

export default App