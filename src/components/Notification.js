import React from 'react'

const Notification = ({ message, type }) => {
  if (message.message === null) {
    return null
  }

  return (
    <div className={message.type}>
      {message.message}
    </div>
  )
}

export default Notification