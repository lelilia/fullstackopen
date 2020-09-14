

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.data]
    case 'INIT':
      return action.data
    case 'VOTE': {
      const id = action.data.id
      const anecdoteToLike = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToLike,
        votes: anecdoteToLike.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    }
    default: 
      return state
  }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT',
    data: anecdotes
  }
}

export default reducer