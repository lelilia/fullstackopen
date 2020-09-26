import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'
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

export const initializeUsers = () => {
  return async dispatch => {
    const users = await userService.getAll()
    dispatch({
      type: 'GET_USERS',
      data: users
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
    }, 5))
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
    }, 5))
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE',
      data: id
    })
    dispatch(showNotificationWithTimeOut({
      text: 'sucessfully deleted'
    }, 5))
  }
}

export const logUserIn = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      dispatch({
        type: 'LOGIN',
        data: user
      })
      await blogService.setToken(user.token)

      dispatch(showNotificationWithTimeOut({
        text: `${user.name} succesfully logged in`,
        color: 'green'
      }, 10))
    }
    catch (exception) {
      console.log('Wrong credentials')
      dispatch(showNotificationWithTimeOut({
        text: 'wrong username or password',
        color: 'red'
      }, 10))

    }
  }
}

export const logUserOut = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    dispatch(showNotificationWithTimeOut({
      text: 'sucessfully logged out.',
      color: 'green'
    }, 10))
    dispatch({
      type: 'LOGOUT',
      data: null
    })
  }
}
