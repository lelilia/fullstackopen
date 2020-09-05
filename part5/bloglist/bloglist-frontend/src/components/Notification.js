import React from 'react'

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

export default Notification