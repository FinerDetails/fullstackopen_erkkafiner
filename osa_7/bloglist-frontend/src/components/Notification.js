import { useMessageValue } from "../Context"

const Notification = () => {
    const message = useMessageValue()
    if (message === null) {
        return null
    }
    if (message.error)
        return <div className="error">{message.text}</div>
    return <div className="info">{message.text}</div>
}

export default Notification
