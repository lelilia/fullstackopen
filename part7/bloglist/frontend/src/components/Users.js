import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


const Users = () => {
  const users = useSelector(state => state.userList)

  console.log(users)
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td>
            </td>
            <td>
              <strong>blogs created</strong>
            </td>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key= {user.id}>
              <td>
                <Link to ={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>
                {user.blogs.length}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Users