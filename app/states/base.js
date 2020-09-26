export default {
  acceptors: [
    model => ({ user }) => {
      if (!model.user) {
        model.user = user
      }

      return model
    },
    model => ({ page }) => {
      if (page) {
        model.page = page
      }

      return model
    },
    model => ({ redirected = false }) => {
      model.redirectPage = null

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
      } else {
        const {
          nav: { home, signin, signup }
        } = model

        model.header = [home, signin, signup]
      }
    }
  ]
}
