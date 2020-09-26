import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { logUserIn } from '../actionTypes'
import { useHistory } from 'react-router-dom'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()
  const history = useHistory()
  const handleLogin = async (event) => {
    event.preventDefault()
    dispatch(logUserIn(username, password))
    history.push('/blogs')
  }

  return(
    <div>
      <form onSubmit={handleLogin}>
        <div>
        username
          <input
            id='username'
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
        password
          <input
            id='password'
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id='login-button' type="submit">login</button>
      </form>
    </div>
  )}


export default LoginForm