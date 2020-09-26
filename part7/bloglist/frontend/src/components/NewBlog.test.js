import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import NewBlog from './NewBlog'

test('<NewBlog /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <NewBlog createBlog={createBlog} />
  )

  const inputTitle = component.container.querySelector('#inputTitle')
  const inputAuthor = component.container.querySelector('#inputAuthor')
  const inputUrl = component.container.querySelector('#inputUrl')
  const form = component.container.querySelector('form')

  fireEvent.change(inputTitle, {
    target: { value: 'some title' }
  })
  fireEvent.change(inputAuthor, {
    target: { value: 'some blogger' }
  })
  fireEvent.change(inputUrl, {
    target: { value: 'www.click.me' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('some title')
  expect(createBlog.mock.calls[0][0].author).toBe('some blogger')
  expect(createBlog.mock.calls[0][0].url).toBe('www.click.me')
})