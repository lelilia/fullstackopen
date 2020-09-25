const reducer = (state = [], action) => {
  switch (action.type) {
  case 'NEW_BLOG': {
    return [...state, action.data]
  }
  case 'LIKE': {
    const id = action.data.id
    const blogToChange = state.find(b => b.id === id)
    const changedBlog = {
      ...blogToChange,
      important: !blogToChange.important
    }
    return state.map(blog =>
      blog.id !== id ? blog : changedBlog
    )
  }
  default:
    return state
  }
}

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

export const createBlog = (content) => {
  return {
    type: 'NEW_BLOG',
    data: {
      content,
      important: false,
      id: generateId()
    }
  }
}

export const toggleImportanceOf = (id) => {
  return {
    type: 'LIKE',
    data: { id }
  }
}
export default reducer