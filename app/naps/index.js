import { pages } from '../constants'

export default (sam, router, intents) => {
  sam.addNAPs([
    model => _ => {
      if (model.redirectPage) {
        router.navigate(model.redirectPage)
        intents.iRedirected()
        return true
      }

      return false
    },

    model => _ => {
      if (model.page === pages.HOME && model.fetching) {
        intents.iFetchArticles(0)
        return true
      }

      return false
    }
  ])
}
