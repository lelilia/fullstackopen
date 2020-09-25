import blogService from './services/blogs'
import store from './store'

let timeOutId
export const showNotificationWithTimeOut = (text, time) => {
  return async dispatch => {
    const timeInMilliseconds = time * 1000
    if (timeOutId) {
      window.clearTimeout(timeOutId)
    }
    timeOutId = setTimeout(() => {
      dispatch({
        type: 'REMOVE'
      })
    }, timeInMilliseconds)
    dispatch({
      type: 'SHOW',
      data: text
    })
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT',
      data: blogs
    })
  }
}


export const createBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
    dispatch(showNotificationWithTimeOut({
      text: `sucessfully added ${newBlog.title} by ${newBlog.author}.`,
      color: 'green'
    },5))
  }
}


export const updateBlog = (id) => {
  return async dispatch => {
    const blogToUpdate = store.getState().blogs.find(b => b.id === id)
    const likedBlog = { ...blogToUpdate, likes: blogToUpdate.likes + 1 }
    const updatedBlog = await blogService.update(id, likedBlog)
    dispatch({
      type: 'LIKE',
      data: updatedBlog
    })
    dispatch(showNotificationWithTimeOut({
      text: `you liked ${updatedBlog.title}.`
    },5))
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE',
      data: id
    })
  }
}

