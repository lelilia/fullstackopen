import React, { useState } from 'react'


const Blog = ({ blog, updateBlog, removeBlog, user }) => {

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
    updateBlog(blog.id)
  }

  const showWhenOwnEntry = { display: blog.user.id === user.id ? '' : 'none' }

  const deleteBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id)
    }
    
  }

  return (

    <div style={blogStyle} id = {blog.id}>
      {blog.title} {blog.author} <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
      <div style={showWhenVisible}>
        {blog.url}
        <br />
      likes {blog.likes} <button onClick={addLike}>like</button>
        <br />
        {blog.user.name}
        <br />
        <div style={showWhenOwnEntry}>
          <button onClick={deleteBlog}>remove</button>
        </div>
      </div>
    </div>
  )
}

export default Blog
