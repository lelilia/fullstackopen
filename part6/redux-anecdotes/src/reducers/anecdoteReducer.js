

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD':
      return [...state, action.data]
    case 'INIT':
      return action.data
    case 'VOTE': {
      const id = action.data.id
      const changedAnecdote = action.data
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    }
    
    default: 
      return state
  }
}



export default reducer