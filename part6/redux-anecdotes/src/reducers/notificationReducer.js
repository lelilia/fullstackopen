

const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SHOW':
      const text = action.data
      return text
    
    case 'REMOVE':
      return ''
    default:
      return state
  }
  
}

export default reducer