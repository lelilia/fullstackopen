const _ = require('lodash')

const dummy = (blogs) => {
  blogs
  return 1
}

const totalLikes = (blogs) => {
  const total = blogs.reduce((sum, blog) => sum + blog.likes, 0)
  return blogs.length === 0
    ? 0
    : total / blogs.length
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return { error: 'empty list' }
  const faveBlog = blogs.reduce((prev, curr) => prev.likes > curr.likes ? prev : curr)
  return {
    title: faveBlog.title,
    author: faveBlog.author,
    likes: faveBlog.likes
  }
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return { error: 'empty list' }
  const mostBlogs = _
    .chain(blogs)
    .groupBy('author')
    .map((blogs, author) => ({ author, blogs: blogs.length }))
    .sortBy('blogs')
    .last()
    .value()
  return mostBlogs
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return { error: 'empty list' }

  const mostLikes = _
    .chain(blogs)
    .groupBy('author')
    .map((blog, author) => ({ author: author, likes: _.sumBy(blog, 'likes') }))
    .sortBy('likes')
    .last()
    .value()
  return mostLikes
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}