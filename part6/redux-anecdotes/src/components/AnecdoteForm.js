import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote, showNotificationWithTimeOut } from '../actionTypes'

const AnecdoteForm = (props) => {

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.showNotificationWithTimeOut(`you added '${content}'`, 10)
  }

  return (
    <form onSubmit={addAnecdote}>
      <input name='anecdote' />
      <button type='submit'>create</button>
    </form>
  )
}


const mapDispatchToProps = {
  createAnecdote,
  showNotificationWithTimeOut
}

const ConnectedAnecdoteForm = connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm