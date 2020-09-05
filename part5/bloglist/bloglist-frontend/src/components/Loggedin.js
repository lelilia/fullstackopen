import React from 'react'
import Blog from './Blog'
import NewBlog from './NewBlog'

const Loggedin = (props) => (

  <div>
    <h2>blogs</h2>
    <p>
      {props.user.name} logged in
    <button onClick={props.handleLogout}>logout</button>
    </p>
    <NewBlog 
      addBlog = {props.addBlog}
      newTitle = {props.newTitle}
      handleTitleChange = {props.handleTitleChange}
      newAuthor = {props.newAuthor}
      handleAuthorChange = {props.handleAuthorChange}
      newUrl = {props.newUrl}
      handleUrlChange = {props.handleUrlChange}
    />

    {
      props.blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )
    }
  </div>
)

export default Loggedin