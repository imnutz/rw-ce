import { pages, PERSONAL_FEED_ID } from '../constants'

export default {
  acceptors: [
    model => ({ user }) => {
      if (!model.user) {
        model.user = user
        model.home.currentTab = PERSONAL_FEED_ID
      }

      return model
    },
    model => ({ page }) => {
      if (page) {
        model.page = page

        if (model.page === pages.HOME) {
          model.home.articles = []
        }
      }

      return model
    },
    model => ({ redirected = false }) => {
      if (redirected) {
        model.redirectPage = null
      }

      return model
    }
  ],
  reactors: [
    model => _ => {
      if (model.user) {
        const {
          nav: { home, editor, settings }
        } = model
        model.header = [home, editor, settings]

        const {
          personalFeed, globalFeed
        } = model.home.tabInfos
        model.home.tabs = [personalFeed, globalFeed]
      } else {
        const {
          nav: { home, signin, signup }
        } = model

        model.header = [home, signin, signup]

        const { globalFeed } = model.home.tabInfos
        model.home.tabs = [globalFeed]
      }

      return model
    }
  ]
}
