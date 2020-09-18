import React from 'react'
import { connect } from 'react-redux'
import { showNotificationWithTimeOut, sortAnecdotes, vote } from '../actionTypes'
import Anecdote from './Anecdote'

const AnecdoteList = (props) => {
  
  return (
    <ul>
      {sortAnecdotes(props.anecdotes).map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={
            () => {
              props.vote(anecdote.id)
              props.showNotificationWithTimeOut(`you voted '${anecdote.content}'`, 10)
            }
          }
        />
      )}
    </ul>
  )
}

const mapDispatchToProps = {
  showNotificationWithTimeOut, 
  sortAnecdotes,
  vote
}

const mapStateToProps = (state) => {
  let anecdotes
  if (state.filter === '') {
    anecdotes = state.anecdotes
  }
  else {
    anecdotes = state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter))
  }
  return {
    anecdotes,
    filter: state.filter
  }
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdotes