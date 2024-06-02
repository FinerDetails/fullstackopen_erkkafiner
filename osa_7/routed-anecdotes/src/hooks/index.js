import { useState } from 'react'

export const useField = (reset) => {
  const [value, setValue] = useState('')
  const onChange = (event = {target: {value: ""}}) => {
    setValue(event.target.value)
  }
  const type = 'text'

  if(reset === 'reset') {
    setValue('')
    return
  }

  return {
    type,
    value,
    onChange
  }
}