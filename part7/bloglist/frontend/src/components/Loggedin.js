import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { logUserOut } from '../actionTypes'

const Loggedin = () => {
  const username = useSelector(state => state.user.name)

  const dispatch = useDispatch()
  const history = useHistory()
  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(logUserOut())
    history.push('/')
  }
  return(

    <>
      {username} logged in
      <button onClick={handleLogout}>logout</button>
    </>
  )}

export default Loggedin