import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  console.log('notification', notification, notification.text)

  if (notification === ''){
    return null
  }
  const className = `message ${notification.color}`
  return (
    <div className = {className}>
      {notification.text}
    </div>
  )
}
/*
const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }
  const className = `message ${notification.color}`
  return (
    <div className={className} >
      {notification.message}
    </div>
  )
}
*/
export default Notification