import { pages } from '../constants'
import {
  toggleFeed,
  selectTag,
  selectPage
} from '../actions/home'
import {
  fetchArticles,
  fetchFeeds,
  fetchTags
} from '../actions/article'

export default {
  acceptors: [
    model => ({ articles }) => {
      if (model.page === pages.HOME && articles && (model.fetchingArticles || model.paginating)) {
        model.fetchingArticles = false
        model.paginating = false
        model.home.pageChanged = false
        model.home.articles = articles.articles
        model.home.articlesCount = articles.articlesCount
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
          model.excludeTagTab()
          model.home.currentTab = tabId
          model.home.articles = undefined
          model.home.currentPage = 1
        }
      }

      return model
    },
    model => ({ tagName }) => {
      if (tagName) {
        model.excludeTagTab()
        model.home.tabs.push({
          name: `#${tagName}`,
          id: tagName
        })
        model.home.currentTab = tagName
        model.home.articles = undefined
        model.home.currentPage = 1
      }

      return model
    },
    model => ({ pageNumber }) => {
      if (pageNumber) {
        if (model.home.currentPage !== pageNumber) {
          model.home.currentPage = pageNumber
          model.home.pageChanged = true
        }
      }
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

      if (model.isHome() && model.home.pageChanged) {
        model.paginating = true
      }
    }
  ],

  actions: [
    toggleFeed,
    selectTag,
    selectPage,
    fetchArticles,
    fetchFeeds,
    fetchTags
  ],

  options: {
    ignoreOutdatedProposals: true
  }
}
