import { pages, PERSONAL_FEED_ID } from '../constants'
import { isEmptyArray } from '../utils'
import {
  redirected,
  setPage
} from '../actions/init'

export default {
  acceptors: [
    model => _ => {
      if (model.hasError()) {
        console.error(model.error())
      }

      return model
    },

    model => ({ page, user }) => {
      if (page) {
        model.page = page

        if (model.page === pages.HOME) {
          model.home.articles = undefined
        }

        const {
          personalFeed, globalFeed
        } = model.home.tabInfos

        const {
          nav: { home, editor, settings, signin, signup }
        } = model

        if (user && !model.user) {
          model.user = user
          model.isAuthenticated = true
          model.home.currentTab = PERSONAL_FEED_ID
        }

        if (model.isAuthenticated) {
          model.header = [home, editor, settings]

          if (isEmptyArray(model.home.tabs)) {
            model.home.tabs = [personalFeed, globalFeed]
          } else {
            const hasPersonalTab = model.home.tabs.some(t => {
              return t.id === personalFeed.id
            })

            if (!hasPersonalTab) {
              model.home.tabs.unshift(personalFeed)
            }
          }
        } else {
          model.header = [home, signin, signup]

          if (isEmptyArray(model.home.tabs)) {
            model.home.tabs = [globalFeed]
          }
        }
      }

      return model
    },
    model => ({ redirected = false }) => {
      if (redirected) {
        model.redirectPage = null
      }

      return model
    },

    model => ({ favoritedArticle }) => {
      if (favoritedArticle && model.isHome()) {
        const length = model.home.articles.length
        for (var i = 0; i < length; i++) {
          if (model.home.articles[i].slug === favoritedArticle.slug) {
            model.home.articles[i].favoritesCount = favoritedArticle.favoritesCount
            model.home.articles[i].favorited = favoritedArticle.favorited
          }
        }

        model.favorite = false
        model.foundArticle = undefined
      } else if (favoritedArticle && model.isArticlePage()) {
        model.articleDetail.favorited = favoritedArticle.favorited
        model.articleDetail.favoritesCount = favoritedArticle.favoritesCount

        model.favorite = false
        model.foundArticle = undefined
      }

      return model
    }
  ],

  actions: [
    redirected,
    setPage
  ]
}
