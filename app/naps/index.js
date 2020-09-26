export default (sam, router, intents) => {
  sam.addNAPs([
    model => _ => {
      if (model.redirectPage) {
        router.navigate(model.redirectPage)
        intents.iRedirected()
        return true
      }

      return false
    }
  ])
}
