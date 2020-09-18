

const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SHOW':
      const text = action.data.text
      return text
    
    case 'REMOVE':
      return ''
    default:
      return state
  }
  
}

export default reducer