import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'
import NewBlog from './NewBlog'
import Toggleable from './Toggleable'
import store from '../store'

const Loggedin = ({ handleLogout, blogFormRef }) => {
  const blogs = useSelector(state => state.blogs)
  const username = store.getState().user.name
  return(

    <div>
      <p>
        {username} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <Toggleable buttonLabel="create new blog" ref = {blogFormRef}>
        <NewBlog blogFormRef = {blogFormRef} />
      </Toggleable>
      {
        blogs.map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
          />
        )
      }
    </div>
  )}

export default Loggedin