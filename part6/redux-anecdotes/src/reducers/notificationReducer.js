

const reducer = (state = 'hello world', action) => {
  switch (action.type) {
    case 'ADD':
      const content = action.data.content
      return `you added '${content}'`
    case 'VOTE':
      return `you voted '${action.data.content}'`
    case 'REMOVE':
      return ''
    default:
      return state
  }
  
}

export default reducer