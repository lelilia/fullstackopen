const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const usersRouter = require('../controllers/users')


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
let token
beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'Anna', passwordHash })

  await user.save()

  const response = await api
    .post('/api/login')
    .send({ username: 'Anna', password: 'sekret' })
    .expect(200)
  token = response.body.token
})
describe('add new blogs', () => {

  test('succeeds if data and token valid', async () => {
    const newBlog = {
      title: 'new blog',
      author: 'by some author'
    }
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
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

  test('fails if data is valid and token is missing', async () => {
    const newBlog = {
      title: 'new blog',
      author: 'by some author'
    }
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('fails if data is missing and token valid', async () => {
    const newBlog = {
      title: 'new blog'
    }
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})


describe('testing deletion', () => {
  let blogId
  beforeEach(async () => {
    newBlog = {
      title: 'to be deleted',
      author: 'someone'
    }
    const response = await api
      .post('/api/blogs')
      .set('Authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
    blogId = response.body.id
  })
  test('sucess if valid id and token', async () => {
    const blogsAtStart = await helper.blogsInDb()

    console.log(await Blog.findById(blogId))

    await api
      .delete(`/api/blogs/${blogId}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const titles = blogsAtEnd.map(blog => blog.title)

    expect(titles).not.toContain(blogToDelete.title)
  })
})

/*
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
*/
/*
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

*/





afterAll(() => {
  mongoose.connection.close()
})