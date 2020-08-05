import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
  <button onClick = {handleClick}>
    {text}
  </button>
)

const Header = ({ title }) => <h1>{title}</h1>

const Statistics = ({ text, state }) => <p>{text} {state}</p>

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header title = "give feedback"/>
      <Button handleClick = {() => setGood(good + 1)} text = "good" />
      <Button handleClick = {() => setNeutral(neutral+1)} text = "neutral" />
      <Button handleClick = {() => setBad(bad + 1)} text = "bad" />
      <Header title = "statistics" />
      <Statistics text = "good" state = {good} />
      <Statistics text = "neutral" state = {neutral} />
      <Statistics text = "bad" state = {bad} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))