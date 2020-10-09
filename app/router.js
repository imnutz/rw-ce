import Navigo from 'navigo'

export default (intents) => {
  const navigo = new Navigo(null, true, '#')

  navigo
    .on('/', () => {
      intents.setPage('home')
    })
    .on('/signin', () => {
      intents.setPage('signin')
    })
    .on('/signup', () => {
      intents.setPage('signup')
    })
    .on('/home', () => {
      intents.setPage('home')
    })
    .on('/editor', () => {
      intents.setPage('editor')
    })
    .on('/article/:slug', (params) => {
      const slug = params.slug
      intents.setPage('article', { slug })
    })

  return navigo
}
