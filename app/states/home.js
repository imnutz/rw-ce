import { pages } from '../constants'
import { toggleFeed, selectTag } from '../actions/home'
import {
  fetchArticles,
  fetchFeeds,
  fetchTags
} from '../actions/article'

export default {
  acceptors: [
    model => ({ articles }) => {
      if (model.page === pages.HOME && articles && model.fetchingArticles) {
        model.fetchingArticles = false
        model.home.articles = articles.articles
      }

      return model
    },
    model => ({ tags }) => {
      if (model.isHome() && tags && model.fetchingTags) {
        model.fetchingTags = false
        model.home.tags = tags
      }
    },
    model => ({ tabId }) => {
      if (model.page === pages.HOME && tabId) {
        if (model.home.currentTab !== tabId) {
          model.home.currentTab = tabId
          model.home.articles = undefined
        }
      }

      return model
    },
    model => ({ tagName }) => {
      if (tagName) {
        model.home.tabs.push({
          name: `#${tagName}`,
          id: tagName
        })
        model.home.currentTab = tagName
        model.home.articles = undefined
      }

      return model
    }
  ],

  reactors: [
    model => _ => {
      if (model.isHome() && !model.home.articles) {
        model.fetchingArticles = true
      }

      if (model.isHome() && !model.home.tags) {
        model.fetchingTags = true
      }
    }
  ],
  actions: [
    toggleFeed,
    selectTag,
    fetchArticles,
    fetchFeeds,
    fetchTags
  ],
  options: {
    ignoreOutdatedProposals: true
  }
}
