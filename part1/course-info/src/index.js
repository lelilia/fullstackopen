import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  console.log(props)
  return <h1>{props.course}</h1>
}

const Part = (props) => (
  <>
    <p>{props.part.name} {props.part.exercises}</p>
  </>
)

const Content = (props) => (
  <>
    <Part part = {props.p1} />
    <Part part = {props.p2} />
    <Part part = {props.p3} />

  </>
)

const Total = (props) => (
  <>
    <p>Number of exercises {props.p1.exercises + props.p2.exercises + props.p3.exercises}</p>
  </>
)

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name :'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  return (
    <div>
      <Header course = {course} />
      <Content p1 = {part1}  p2 = {part2}  p3 = {part3}  />
      <Total  p1 = {part1}  p2 = {part2}  p3 = {part3}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))