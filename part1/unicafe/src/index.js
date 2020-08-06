import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({ handleClick, text }) => (
  <button onClick = {handleClick}>
    {text}
  </button>
)

const Header = ({ title }) => <h1>{title}</h1>

const Statistic = ({ text, value, percent}) => (
  <tr>
    <td>{text}</td>
    <td>{value}{percent}</td>
  </tr>
  )

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  if (total === 0) {
    return (
      <div>No feedback given</div>
    )
  }
  return (
    <>
    <table>
      <tbody>
        <Statistic text = "good" value = {good} />
        <Statistic text = "neutral" value = {neutral} />
        <Statistic text = "bad" value = {bad} />
        <Statistic text = "all" value = {(good - bad) / total} />
        <Statistic text = "positive" value = {good / total * 100} percent = "%"/>
      </tbody>
      
    </table>
    
      
    </>
  )
}

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
      <Statistics good = {good} neutral = {neutral} bad = {bad} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))