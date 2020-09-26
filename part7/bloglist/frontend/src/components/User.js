import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

const User = () => {
  const id = useParams().id
  const users = useSelector(state => state.userList)
  console.log(users)
  const user = users.find(user => user.id === id)

  console.log(user, 'test')
  if (!user) {
    return null
  }
  return (
    <div>
      <h2>{user.name}</h2>
      {user.blogs.length > 0
        ?
        <>
          <h4>added blogs</h4>
          <ul>
            {user.blogs.map(blog =>
              <li key={blog.id}>
                {blog.title}
              </li>
            )}
          </ul>
        </>
        :
        <></>
      }

    </div>
  )
}

export default User