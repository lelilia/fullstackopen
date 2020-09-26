import React from 'react'
import { useSelector } from 'react-redux'
import BlogEntry from './BlogEntry'
import Toggleable from './Toggleable'
import NewBlog from './NewBlog'
import LoginForm from './LoginForm'

const BlogList = ({ blogFormRef }) => {
  const blogs = useSelector(state => state.blogs)
  const user = useSelector(state => state.user)
  return (
    <div>
      {user ?
        <Toggleable buttonLabel='create new blog' ref={blogFormRef}>
          <NewBlog blogFormRef={blogFormRef} />
        </Toggleable> :
        <LoginForm />
      }

      {blogs.map(blog =>
        <BlogEntry
          key={blog.id}
          blog={blog}
        />
      )}
    </div>
  )
}

export default BlogList