const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  if (message.error === true)
    return (
      <div className="error">
        {message.text}
      </div>
    )
  return (
    <div className="info">
      {message.text}
    </div>
  )
}

export default Notification