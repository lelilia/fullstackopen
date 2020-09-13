import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ username, setUsername, handleLogin, password, setPassword }) => {

  return(
    <div>

      <h2>log in to application</h2>
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

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired
}

export default LoginForm