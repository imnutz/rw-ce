export default {
  acceptors: [
    (model) => _ => {
      model.header = [
        model.nav.home,
        model.nav.signin,
        model.nav.signup
      ]

      return model
    },

    (model) => ({ page }) => {
      if (page) {
        model.page = page
      }

      return model
    }
  ]
}
