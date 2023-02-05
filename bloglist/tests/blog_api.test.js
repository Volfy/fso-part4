const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const Blog = require('../models/blog')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjs = helper.initialBlogs.map((b) => new Blog(b))
  const promiseArr = blogObjs.map((b) => b.save())
  await Promise.all(promiseArr)
})

test('all blogs are returned', async () => {
  const res = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  expect(res.body).toHaveLength(helper.initialBlogs.length)
})

test('blogs have unique identifier property named id', async () => {
  const res = await api
    .get('/api/blogs')
  expect(res.body[0].id).toBeDefined()
})

afterAll(async () => {
  await mongoose.connection.close()
})
