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

module.exports = {
  dummy,
  totalLikes
}