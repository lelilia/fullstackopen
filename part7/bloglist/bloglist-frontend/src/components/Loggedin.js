import React from 'react'
import { useSelector } from 'react-redux'
import Blog from './Blog'
import NewBlog from './NewBlog'
import Toggleable from './Toggleable'


const Loggedin = ({ user, handleLogout, blogFormRef }) => {
  const blogs = useSelector(state => state.blogs)

  return(

    <div>
      <p>
        {user.name} logged in
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
            user = {user}
          />
        )
      }
    </div>
  )}

export default Loggedin