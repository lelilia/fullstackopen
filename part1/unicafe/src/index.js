import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
  <button onClick = {handleClick}>
    {text}
  </button>
)

const Header = ({ title }) => <h1>{title}</h1>

const ShowTotal = ({ text, state }) => <div>{text} {state}</div>

const ShowAverage = ({ text, score, total }) => {
  let result 
  if (total === 0) {
    result = 0
  }
  else {
    result = score / total
  }
  return (
    <div>{text} {result}</div>
  )
}

const ShowPercentPositive = ({ text, score, total }) => {
  let result 
  if (total === 0) {
    result = 0
  }
  else {
    result = score / total * 100
  }
  return <div>{text} {result}%</div>
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  console.log((good - bad))
  return (
    <div>
      <Header title = "give feedback"/>
      <Button handleClick = {() => setGood(good + 1)} text = "good" />
      <Button handleClick = {() => setNeutral(neutral+1)} text = "neutral" />
      <Button handleClick = {() => setBad(bad + 1)} text = "bad" />
      <Header title = "statistics" />
      <ShowTotal text = "good" state = {good} />
      <ShowTotal text = "neutral" state = {neutral} />
      <ShowTotal text = "bad" state = {bad} />
      <ShowTotal text = "all" state = {good + neutral + bad} />
      <ShowAverage text = "average" score = {good - bad} total = {good + neutral + bad} />
      <ShowPercentPositive text = "positive" score = {good} total = {good + neutral + bad} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))