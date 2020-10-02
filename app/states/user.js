import storage from '../storage'
import {
  signin,
  signup
} from '../actions/user'

import {
  STORAGE_USER_KEY,
  pages,
  PERSONAL_FEED_ID
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
          storage.setItem(STORAGE_USER_KEY, user)
        }
      }

      return model
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
          storage.setItem(STORAGE_USER_KEY, user)
        }
      }
    }
  ],

  actions: [
    signin,
    signup
  ]
}
