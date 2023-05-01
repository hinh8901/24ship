import { memo } from "react"

const ErrorMessage = ({ message }) => {
  return <p className="absolute redColor fw-500">{message}</p>
}

export default memo(ErrorMessage)
