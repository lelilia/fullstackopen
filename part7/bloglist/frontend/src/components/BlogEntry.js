import React from 'react'
import { Link } from 'react-router-dom'

const BlogEntry = ({ blog }) => {

  return(
    <div className = 'blogentry'>
      <Link
        to ={`/blogs/${blog.id}`}>{blog.title} {blog.author}
      </Link>
    </div>
  )
}
export default BlogEntry