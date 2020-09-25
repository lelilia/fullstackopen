const reducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'REMOVE': {
    const id = action.data
    const newState = state.filter(blog => blog.id !== id)
    return newState
  }
  case 'LIKE': {
    const id = action.data.id
    const changedBlog = action.data
    return state.map(blog => blog.id !== id ? blog : changedBlog)
  }
  case 'INIT':
    return action.data
  default:
    return state
  }
}

export default reducer