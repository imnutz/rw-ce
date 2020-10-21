import {
  fetchProfileArticles
} from '../actions/profile'

import {
  PROFILE_FAVORITED_TAB,
  PROFILE_MYARTICLE_TAB
} from '../constants'

export default {
  acceptors: [
    model => ({ pageNumber }) => {
      if (model.isProfilePage() && pageNumber) {
        const currentPage = model.profile.currentPage

        if (pageNumber !== currentPage) {
          model.profile.currentPage = pageNumber
          model.profile.pageChanged = true
        }
      }
    },

    model => ({ profileArticles, profileArticlesCount }) => {
      if (model.isProfilePage() && profileArticles) {
        model.profile.articles = profileArticles
        model.profile.articlesCount = profileArticlesCount
        model.profile.pageChanged = false
      }
    },

    model => ({ profileName, favorites }) => {
      if (profileName) {
        model.profileName = profileName

        if (model.profile.info && model.profile.info.username !== profileName) {
          model.profile.info = undefined
        }

        if (favorites) {
          model.profile.currentTab = PROFILE_FAVORITED_TAB
        } else {
          model.profile.currentTab = PROFILE_MYARTICLE_TAB
        }

        model.profile.articles = undefined
        model.profile.currentPage = 1
        model.profile.articlesCount = 0
      }
    }
  ],

  actions: [ fetchProfileArticles ]
}
