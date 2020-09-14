import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { sortAnecdotes, vote } from '../reducers/anecdoteReducer'
import Anecdote from './Anecdote'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  return (
    <ul>
      {sortAnecdotes(anecdotes).map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={
            () => dispatch(vote(anecdote.id))
          }
        />
      )}
    </ul>
  )
}

export default AnecdoteList