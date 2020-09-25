import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateBlog, removeBlog } from '../actionTypes'


const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const userId = blog.user.id ? blog.user.id : blog.user


  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const addLike = (event) => {
    event.preventDefault()
    dispatch(updateBlog(blog.id))
  }

  const showWhenOwnEntry = { display: userId === user.id ? '' : 'none' }

  const deleteBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog.id))
    }

  }

  return (

    <div style={blogStyle} id={blog.id} className='blog'>
      {blog.title} {blog.author} <button className='hideButton' onClick={toggleVisibility}>{visible ? 'hide' : 'view'}</button>
      <div style={showWhenVisible} className = 'togglableContent'>
        {blog.url}
        <br />
      likes <span className="likes">{blog.likes}</span> <button className='likeButton' onClick={addLike}>like</button>
        <br />
        {blog.user.name}
        <br />
        <div style={showWhenOwnEntry}>
          <button className='deleteButton' onClick={deleteBlog}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog
