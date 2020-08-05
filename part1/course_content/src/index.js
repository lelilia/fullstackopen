import React from 'react'
import ReactDOM from 'react-dom'

const Hello = (props) =>(
  <div>
    <p>Hello, {props.name}! You are {props.age} years old.</p>
  </div>
)

const App = () => {
  const name = "Peter"
  const age = 10
  return (
    <div>
      <h1>Greetings</h1>
      <Hello name = "Leli" age = {26+8}/>
      <Hello name = {name} age = {age}/>
      <Hello />
    </div>
  )
}
ReactDOM.render(<App />, document.getElementById('root'))