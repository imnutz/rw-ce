import storage from '../storage'
import {
  signin,
  signup,
  setFollow,
  followUser,
  fetchUser,
  logout,
  setUserSettings,
  updateUserSettings
} from '../actions/user'

import {
  STORAGE_USER_KEY,
  pages,
  PERSONAL_FEED_ID,
  GLOBAL_FEED_ID
} from '../constants'

export default {
  acceptors: [
    model => ({ data = {} }) => {
      const authenticated = data.authenticated
      if (authenticated) {
        const { user, errors } = data.authInfo

        if (errors) {
          model.authErrors = errors
        } else if (user) {
          model.user = user
          model.authErrors = {}
          model.redirectPage = pages.HOME
          model.isAuthenticated = true

          model.home.currentTab = PERSONAL_FEED_ID
          model.home.currentPage = 1
          storage.setItem(STORAGE_USER_KEY, user)
        }
      }
    },

    model => ({ data = {} }) => {
      const registered = data.registered
      if (registered) {
        const { user, errors } = data.userInfo

        if (errors) {
          model.registrationErrors = errors
        } else if (user) {
          model.user = user
          model.registrationErrors = {}
          model.redirectPage = pages.HOME
          model.isAuthenticated = true
          model.home.currentTab = PERSONAL_FEED_ID
          model.home.currentPage = 1
          storage.setItem(STORAGE_USER_KEY, user)
        }
      }
    },

    model => ({ username, following }) => {
      if (username) {
        if (!model.isAuthenticated) {
          model.redirectPage = pages.SIGNUP
        } else {
          model.following = following
          model.followUser = username
        }
      }
    },

    model => ({ followedProfile }) => {
      if (followedProfile) {
        model.followUser = undefined

        model.articleDetail.author.following = followedProfile.following
      }
    },

    model => ({ currentUser }) => {
      if (model.isSettingsPage() && currentUser) {
        model.settingsUser = currentUser
      }
    },

    model => ({ isSignedOut }) => {
      if (isSignedOut) {
        model.user = undefined
        model.isAuthenticated = false
        model.home.currentTab = GLOBAL_FEED_ID
        model.home.currentPage = 1

        storage.removeItem(STORAGE_USER_KEY)
        model.redirectPage = pages.HOME
      }
    },

    model => ({ newSettings }) => {
      if (newSettings) {
        model.newSettings = newSettings
      }
    },

    model => ({ updatedUser, settingErrors }) => {
      if (settingErrors) {
        model.updateSettingErrors = settingErrors
        model.newSettings = undefined
      } else if (updatedUser) {
        model.newSettings = undefined
        model.redirectPage = pages.HOME
      }
    }
  ],

  actions: [
    signin,
    signup,
    setFollow,
    followUser,
    fetchUser,
    logout,
    setUserSettings,
    updateUserSettings
  ]
}
