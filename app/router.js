import Navigo from 'navigo'

export default (intents) => {
  const navigo = new Navigo(null, true, '#')

  navigo.on('/signin', () => {
    intents.goToPage('signin')
  })

  navigo.on('/home', () => {
    intents.goToPage('home')
  })
}
