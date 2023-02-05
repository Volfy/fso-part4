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

test('valid blog can be added', async () => {
  const newBlog = {
    title: 'Dumb sentence for a title',
    author: 'John Doe',
    url: 'xyz.com',
    likes: 0,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const res = await api.get('/api/blogs')

  expect(res.body).toHaveLength(helper.initialBlogs.length + 1)
  expect(res.body.map((r) => r.title)).toContain('Dumb sentence for a title')
})

test('likes default to 0 if not provided', async () => {
  const newBlog = {
    title: 'Dumb sentence for a title',
    author: 'John Doe',
    url: 'xyz.com',
  }

  const res = await api
    .post('/api/blogs')
    .send(newBlog)

  expect(res.body.likes).toEqual(0)
})

test('fails to post if title is missing', async () => {
  const newBlog = {
    author: 'John Doe',
    url: 'xyz.com',
    likes: 0,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const res = await api.get('/api/blogs')
  expect(res.body).toHaveLength(helper.initialBlogs.length)
})

test('fails to post if url is missing', async () => {
  const newBlog = {
    title: 'Dumb title',
    author: 'John Doe',
    likes: 0,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const res = await api.get('/api/blogs')
  expect(res.body).toHaveLength(helper.initialBlogs.length)
})

afterAll(async () => {
  await mongoose.connection.close()
})
