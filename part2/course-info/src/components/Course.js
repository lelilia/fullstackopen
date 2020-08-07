import React from 'react'


const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )   
}

const Total = ({ parts }) => {
  const total = parts.reduce((sum, part) => sum + part.exercises, 0)

  return(
    <p><strong>total of {total} exercises</strong> </p>
  ) 
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(part => 
        <Part key = {part.id} part = {part} />
      )}
    </div>
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header course = {course} />
      <Content course = {course} />
      <Total parts = {course.parts} />
    </>
  )
}

export default Course