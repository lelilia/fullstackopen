import React from 'react'
import Blog from './Blog'
import NewBlog from './NewBlog'
import Toggleable from './Toggleable'

const Loggedin = ({ createBlog, user, handleLogout, blogs, blogFormRef, updateBlog }) => {
  
  return(

  <div>
    <h2>blogs</h2>
    <p>
      {user.name} logged in
    <button onClick={handleLogout}>logout</button>
    </p>
    <Toggleable buttonLabel="create new blog" ref = {blogFormRef}>
      <NewBlog
        createBlog ={createBlog}
      />
    </Toggleable>
    {
      blogs.map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} />
      )
    }
  </div>
)}

export default Loggedin