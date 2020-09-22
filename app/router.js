import Navigo from 'navigo'

export default (intents) => {
  const navigo = new Navigo(null, true, '#')

  navigo
    .on('/', () => {
      intents.goToPage('home')
    })
    .on('/signin', () => {
      intents.goToPage('signin')
    })
    .on('/home', () => {
      intents.goToPage('home')
    })
    .resolve()
}
