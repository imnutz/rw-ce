import storage from '../storage'
import {
  STORAGE_USER_KEY
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
          model.redirectPage = '/home'

          storage.setItem(STORAGE_USER_KEY, user)
        }
      }

      return model
    }
  ]
}
