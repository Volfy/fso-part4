// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => 1

const totalLikes = (blogs) => {
  const reducer = (sum, item) => sum + item.likes

  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null

  const maxLikes = blogs.reduce((sum, item) => (sum > item.likes ? sum : item.likes), 0)
  const faves = blogs.find((b) => b.likes === maxLikes)

  return {
    title: faves.title || faves[0].title,
    author: faves.author || faves[0].author,
    url: faves.url || faves[0].url,
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
}
