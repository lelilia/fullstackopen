import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateBlog, removeBlog } from '../actionTypes'


const Blog = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const id = useParams().id
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.find(blog => blog.id === id)

  if (!blog) {
    return null
  }

  const addLike = (event) => {
    event.preventDefault()
    dispatch(updateBlog(blog.id))
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog.id))
    }
    history.push('/blogs')
  }

  const showWhenOwnEntry = { display: blog.user.id === user.id ? '' : 'none' }
  const visibleWhenLoggedIn = user ? true : false

  console.log(user.id === blog.user.id)
  return (
    <div>
      <h2>
        {blog.title} <em>by</em> {blog.author}
      </h2>
      <a href={blog.url} target='_blank' rel='noopener noreferrer'>{blog.url}</a>
      <br />
      {blog.likes} likes
      {visibleWhenLoggedIn ? <button className='likeButton' onClick={addLike}>like</button> : <></>}
      <br />
      added by {blog.user.name}
      <div style={showWhenOwnEntry}>
        <button className='deleteButton' onClick={deleteBlog}>remove</button>
      </div>
    </div>
  )
}
export default Blog