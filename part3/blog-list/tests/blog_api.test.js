const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')


beforeEach(async () => {
  await Blog.deleteMany({})

  const blogs = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = await blogs.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('check inital blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('id is definded', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    response.body.map(blog => expect(blog.id).toBeDefined())
  })
})

describe('add new blogs', () => {
  test('succeeds if data valid', async () => {
    const newBlog = {
      title: 'new blog',
      author: 'by some author'
    }
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    const authors = blogsAtEnd.map(blog => blog.author)
    const savedBlog = response.body

    expect(titles).toContain(savedBlog.title)
    expect(authors).toContain(savedBlog.author)
    expect(savedBlog.likes).toBeDefined()
  })

  test('fails with error code 400 without author', async () => {
    const newBlog = {
      title: 'where did this come from'
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('fails with error code 400 if title is missing', async () => {
    const newBlog = {
      author: 'didnt write anything'
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})


describe('testing deletion', () => {
  test('sucess if valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(blog => blog.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('testing updating', () => {
  test('update valid blog with likes', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[1]
    const updatedLikes = { likes: 100 }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedLikes)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd[1].likes).toEqual(updatedLikes.likes)
  })

  test('update valid blog without initial likes', async () => {
    const newBlog = {
      title: 'some title',
      author: 'some old white man'
    }
    const response = await api
      .post('/api/blogs')
      .send(newBlog)

    const updatedLikes = { likes: 100 }

    await api
      .put(`/api/blogs/${response.body.id}`)
      .send(updatedLikes)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(updatedLikes.likes)
  })
})







afterAll(() => {
  mongoose.connection.close()
})