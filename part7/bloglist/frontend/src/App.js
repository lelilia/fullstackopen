import React, { useEffect, useRef } from 'react'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import Loggedin from './components/Loggedin'
import User from './components/User'
import BlogList from './components/BlogList'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs, initializeUsers } from './actionTypes'
import { Switch, Route, Link, Redirect } from 'react-router-dom'
import Users from './components/Users'
import Blog from './components/Blog'
import Notification from './components/Notification'
import './App.css'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  /**
   * initialize users and blogs at the beginning
   */
  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [dispatch])

  const blogFormRef = useRef()

  /**
   * keep the user logged in when reloading
   */
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


  return (
    <div>
      <div>
        <Link to='/'>blogs</Link>
        {user ?
          <>
            <Link to='/users'>users</Link>
            <Loggedin />
          </> :
          <>
            <Link to='/login'>login</Link>
          </>
        }
      </div>
      <Notification />
      <h2>Blog App</h2>
      <Switch>
        <Route path='/users/:id'>
          <User />
        </Route>
        <Route path='/users' render={() =>
          user ? <Users /> : <Redirect to='/' />
        } />
        <Route path = '/login'>
          <LoginForm/>
        </Route>
        <Route path='/blogs/:id'>
          <Blog />
        </Route>
        <Route path='/'>
          <BlogList  blogFormRef={blogFormRef}/>
        </Route>
      </Switch>
    </div>
    /*
    <Router>
      <div>
        <Link to='/users'>users</Link>
        {user
          ? <>
            <Link to='/blogs'>blogs</Link>
            <Link to='/users'>users</Link>
            <em>{user.name} logged in</em>
          </>
          : <Link to='/login'>login</Link>
        }
      </div>
      <Notification />
      <h2>blogs</h2>
      {user
        ? <p>{user.name} logged in</p>
        : <LoginForm />
      }
      <Loggedin
        blogFormRef={blogFormRef}
      />
      <Switch>
        <Route path='/blogs/:id'>
          <Blog />
        </Route>
        <Route path='/blogs'>
          <BlogList />
        </Route>
        <Route path='/users/:id'>
          <User />
        </Route>
        <Route path='/users' render={() =>
          user ? <Users /> : <Redirect to='/login' />
        } />
        <Route path='/'>
          <LoginForm />
        </Route>
      </Switch>
    </Router>
    /*
    <div>
      <Notification />
      <h2>blogs</h2>
      {user === '' ?
        <LoginForm/> :
        <Loggedin
          blogFormRef={blogFormRef}
        />
      }
    </div>
    */
  )
}

export default App