import anecdoteService from './services/anecdotes'
import store from './store'

const getId = () => (100000 * Math.random()).toFixed(0)

export const hideNotification = () => {
  return {
    type: 'REMOVE'
  }
}

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}


export const initializeAnecdotes = (anecdotes) => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD',
      data: newAnecdote
    })
  }
}

export const sortAnecdotes = (anecdotes) => {
  return (anecdotes.sort((a, b) => b.votes - a.votes))
}

export const vote = (id) => {
  return async dispatch => {
    const anecdoteToUpdate = store.getState().anecdotes.find(a => a.id === id)
    const votedAnecdote = {...anecdoteToUpdate, votes: anecdoteToUpdate.votes + 1}
    const updatedAnecdote = await anecdoteService.update(id, votedAnecdote)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}

export const showNotificationWithTimeOut = (text, time) => {
  return async dispatch => {
    const timeInMillisec = time * 1000
    dispatch({
      type: 'SHOW',
      data: text
    })
    setTimeout(() => {
      dispatch({
        type: 'REMOVE'
      })
    }, timeInMillisec)
  }
}