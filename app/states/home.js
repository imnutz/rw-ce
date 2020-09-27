import { pages } from '../constants'
export default {
  acceptors: [
    model => ({ articles }) => {
      if (model.page === pages.HOME && articles && model.fetching) {
        console.log(articles)
        model.fetching = false
        model.home.articles = articles.articles
      }

      return model
    },
    model => ({ tabId }) => {
      if (model.page === pages.HOME && tabId) {
        if (model.home.currentTab !== tabId) {
          model.home.currentTab = tabId
          model.home.articles = []
        }
      }

      return model
    }
  ],

  reactors: [
    model => _ => {
      if (model.page === pages.HOME && (!model.home.articles || !model.home.articles.length)) {
        model.fetching = true
      }
    }
  ]
}
