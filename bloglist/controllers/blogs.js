const router = require('express').Router()
const Blog = require('../models/blog')

router.get('/', async (req, res) => {
  const blogs = await Blog.find({})
  res.json(blogs)
})

router.get('/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id)
  res.json(blog)
})

router.post('/', async (req, res) => {
  const { body } = req

  if (body.title === undefined || body.url === undefined) {
    return res.status(400).json({ error: 'title or url missing' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
  })

  const saved = await blog.save()
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
