import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { hideNotification, sortAnecdotes, vote } from '../actionTypes'
import Anecdote from './Anecdote'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(({filter, anecdotes}) => {
    return filter === '' 
      ? anecdotes 
      : anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter))
  })

  return (
    <ul>
      {sortAnecdotes(anecdotes).map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={
            () => {
              dispatch(vote(anecdote))
              setTimeout(() => dispatch(hideNotification()), 5000)
            }
          }
        />
      )}
    </ul>
  )
}

export default AnecdoteList