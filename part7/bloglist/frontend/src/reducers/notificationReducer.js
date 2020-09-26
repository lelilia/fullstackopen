const reducer = (state = '', action) => {
  switch (action.type) {
  case 'SHOW':
    return action.data
  case 'REMOVE':
    return ''
  default:
    return state
  }
}

export default reducer