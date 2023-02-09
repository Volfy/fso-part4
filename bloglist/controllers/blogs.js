/* eslint-disable no-underscore-dangle */
const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

router.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate('user', { username: 1, name: 1 })
  res.json(blog)
})

router.post('/', async (req, res) => {
  const { body } = req

  if (body.title === undefined || body.url === undefined) {
    return res.status(400).json({ error: 'title or url missing' })
  }

  const users = await User.find({})
  const userId = users.map((u) => u.toJSON())[0].id

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
    user: userId,
  })

  const saved = await blog.save()

  const user = await User.findById(userId)
  user.blogs = user.blogs.concat(saved._id)
  await user.save()

  return res.status(201).json(saved)
})

router.delete('/:id', async (req, res) => {
  await Blog.findByIdAndRemove(req.params.id)
  return res.status(204).end()
})

router.put('/:id', async (req, res) => {
  const { body } = req
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  const updated = await Blog.findByIdAndUpdate(req.params.id, blog)
  return res.json(updated).end()
})

module.exports = router
