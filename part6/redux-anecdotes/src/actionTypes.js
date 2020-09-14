

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



export const createAnecdote = (content) => {

  return {
    type: 'ADD',
    data: asObject(content)
  }
}

export const sortAnecdotes = (anecdotes) => {
  return(anecdotes.sort((a,b) => b.votes - a.votes))
} 

export const vote = (anecdote) => {
  return {
    type: 'VOTE',
    data: { ...anecdote }
  }
}