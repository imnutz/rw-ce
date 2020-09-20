import { define } from 'uce'

const componentName = 'rw-signin'

define(componentName, {
  props: {
    errors: []
  },

  init () {
    this.emailRef = {}
    this.passwordRef = {}

    this.render()
  },

  submit (evt) {
    evt.preventDefault()
  },

  render () {
    return this.html`
      <div class="auth-page">
        <div class="container page">
          <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12">
              <h1 class="text-xs-center">${this.title}</h1>
              <form>
                <fieldset class="form-group">
                  <input class="" type="text" placeholder="Email" ref=${this.emailRef}>
                </fieldset>
                <fieldset class="form-group">
                  <input class="" type="password" placeholder="Password" ref=${this.passwordRef}>
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right" onclick=${this.submit}>
                  Sign In
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    `
  }
})
