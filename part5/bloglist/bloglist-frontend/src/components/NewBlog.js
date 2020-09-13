import React, { useState } from 'react'

const NewBlog = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')



  const handleTitleChange = (event) => setNewTitle(event.target.value)

  const handleAuthorChange = (event) => setNewAuthor(event.target.value)

  const handleUrlChange = (event) => setNewUrl(event.target.value)

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div className = 'formDiv'>
      <h2>create new</h2>
      <form onSubmit={addBlog} >
        <div>
          title: <input id='inputTitle' value={newTitle} onChange={handleTitleChange} />
          <br />
        author: <input id='inputAuthor' value={newAuthor} onChange={handleAuthorChange} />
          <br />
        url: <input id='inputUrl' value={newUrl} onChange={handleUrlChange} />
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