import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createAnecdote, sortAnecdotes } from './reducers/anecdoteReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (event) => {
     event.preventDefault()
     const content = event.target.anecdote.value
     event.target.anecdote.value = ''
     dispatch(createAnecdote(content))
  }

  return(
    <form onSubmit={addAnecdote}>
      <input name='anecdote'/>
      <button type='submit'>create</button>
    </form>
  )
}

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    return {
      type: 'VOTE',
      data: { id }
    }
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortAnecdotes(anecdotes).map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <AnecdoteForm />
    </div>
  )
}

export default App