// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  const reducer = (sum, item) => sum + item.likes

  return blogs
    ? blogs.reduce(reducer, 0)
    : 0
}

module.exports = {
  dummy,
  totalLikes,
}
