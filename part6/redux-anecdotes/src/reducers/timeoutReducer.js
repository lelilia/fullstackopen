const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SHOW':
      return action.data.timeoutId
    default:
      return state
  }
  
}


export default reducer