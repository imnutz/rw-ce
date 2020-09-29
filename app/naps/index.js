export default (sam, router, intents) => {
  sam.addNAPs([
    model => _ => {
      if (model.redirectPage) {
        router.navigate(['/', model.redirectPage].join(''))
        intents.redirected()
        return true
      }

      return false
    },

    model => _ => {
      if (model.isHome() && !model.fetchingArticles && model.fetchingTags) return true

      const isHomeAndFetching = model.isHome() && model.fetchingArticles

      if (isHomeAndFetching && model.isGlobalTab()) {
        intents.fetchArticles(0)
      } else if (isHomeAndFetching && model.isPersonalTab()) {
        intents.fetchFeeds(model.user.token, 0)
      } else if (isHomeAndFetching && model.isTagTab()) {
        intents.fetchArticles(0, 10, model.home.currentTab)
      }

      if (model.isHome() && model.fetchingTags) {
        intents.fetchTags()
      }

      return false
    }
  ])
}
