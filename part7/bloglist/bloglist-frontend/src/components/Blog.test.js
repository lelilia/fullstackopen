import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'


describe('<Blog />', () => {
  let component
  let mockLikeButton

  beforeEach(() => {
    const blog = {
      title: 'Component testing is done with react-testing-library',
      author: 'some famouse person',
      url: 'www.click.me',
      user: 'testuser'
    }

    const user = {
      id: 'testuser'
    }

    mockLikeButton = jest.fn()
    component = render(
      <Blog blog={blog} user={user} updateBlog={mockLikeButton} />
    )
  })

  test('renders content', () => {
    expect(component.container).toHaveTextContent(
      'Component testing is done with react-testing-library'
    )
  })

  test('5.13 blog renders blog title and author but not url or likes', () => {
    const blogDiv = component.container.querySelector('.blog')

    expect(blogDiv).toHaveTextContent('Component testing is done with react-testing-library some famouse person')

    const togglableContent = component.container.querySelector('.togglableContent')
    expect(togglableContent).toHaveStyle('display: none')
  })

  test('5.14 blog url shown when clicked', () => {
    const button = component.getByText('view')
    fireEvent.click(button)

    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  test('5.15 click the like button twice', () => {
    const likeButton = component.getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)
    expect(mockLikeButton.mock.calls).toHaveLength(2)
  })
})

