import { pages, GLOBAL_FEED_ID, PERSONAL_FEED_ID } from '../constants'

export default (sam, router, intents) => {
  sam.addNAPs([
    model => _ => {
      if (model.redirectPage) {
        router.navigate(['/', model.redirectPage].join(''))
        intents.iRedirected()
        return true
      }

      return false
    },

    model => _ => {
      const isHomeAndFetching = model.page === pages.HOME && model.fetching
      if (isHomeAndFetching && model.home.currentTab === GLOBAL_FEED_ID) {
        intents.iFetchArticles(0)
      } else if (isHomeAndFetching && model.home.currentTab === PERSONAL_FEED_ID) {
        intents.iFetchFeeds(model.user.token, 0)
      }

      return false
    }
  ])
}
