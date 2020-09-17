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

export const votes = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}
/*
export const votes = (anecdote) => {
  return async dispatch => {
    const id = anecdote.id
    const anecdoteToUpdate = 
    const updatedAnecdote = await anecdoteService.update(id, anecdoteToUpdate)
  }
}
*/

export const vote = (id) => {
  return async dispatch => {
    const anecdoteToUpdate = store.getState().anecdotes.find(a => a.id === id)
    anecdoteToUpdate.votes = anecdoteToUpdate.votes + 1
    const updatedAnecdote = await anecdoteService.update(id, anecdoteToUpdate)
    dispatch({
      type: 'VOTE',
      data: updatedAnecdote
    })
  }
}