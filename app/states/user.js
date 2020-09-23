export default {
  acceptors: [
    model => ({ data = {} }) => {
      const authenticated = data.authenticated
      if (authenticated) {
        const {
          user,
          errors
        } = data.authInfo

        if (errors) {
          model.authErrors = errors
        } else if (user) {
          model.user = user
          model.authErrors = {}

          // TODO: refactoring
          localStorage.setItem('user', JSON.stringify(user))
        }
      }

      return model
    }
  ]
}
