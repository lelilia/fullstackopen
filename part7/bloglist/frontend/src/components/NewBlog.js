import React from 'react'
import { useDispatch } from 'react-redux'
import useField from '../hooks'
import { createBlog } from '../actionTypes'


const NewBlog = (props) => {

  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value
    }
    props.blogFormRef.current.toggleVisibility()
    dispatch(createBlog(newBlog))
  }

  return (
    <div className='formDiv'>
      <h2>create new</h2>
      <form onSubmit={addBlog} >
        <div>
          title: <input {...title } />
          <br />
          author: <input { ...author } />
          <br />
          url: <input { ...url } />
        </div>
        <div>
          <button id='newBlog' type='submit'>
            create
          </button>
        </div>
      </form>

    </div>
  )
}

export default NewBlog