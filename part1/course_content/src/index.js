import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick = {props.handeClick}>
    {props.text}
  </button>
)

const Display = (props) => (
  <div>{props.value}</div>
)
const App = (props) => {
  const [value, setValue] = useState(10)

  const setToValue = (newValue) => {
    setValue(newValue)
  }

  const hello = (who) => () => console.log("hello", who)
  

  const handeClick = () => {
    console.log('clicked the button')
    setValue(0)
  }
  return (
    <div>
      <Display value = {value} />

      <Button handeClick = {() => setToValue(1000)} text = "1000" />
      <Button handeClick = {() => setToValue(0)} text = "0" />
      <Button handeClick = {() => setToValue(value + 1)} text = "+1" />
     
    </div>
  )
}



ReactDOM.render(<App />, document.getElementById('root'))