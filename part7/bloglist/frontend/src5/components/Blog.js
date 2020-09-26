import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducer/blogReducer'

const Blog = ({ blog, handleClick }) => {
  console.log(blog)
  return (
    <li onClick = { handleClick }>
      {blog.content}
      <strong> {blog.important ? 'important' : ''}</strong>
    </li>
  )
}

const Blogs = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state)

  return (
    <ul>
      {blogs.map(blog =>
        <Blog
          key = {blog.id}
          blog = {blog}
          handleClick = {() =>
            dispatch(toggleImportanceOf(blog.id))
          }
        />
      )}
    </ul>
  )
}

export default Blogs