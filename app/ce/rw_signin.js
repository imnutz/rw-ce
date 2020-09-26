import { define, html } from 'uce'

const componentName = 'rw-signin'

define(componentName, {
  bound: ['render', 'submit', '_getErrorMessage'],

  props: {
    errors: {},
    title: 'Sign In'
  },

  init () {
    this.emailRef = {}
    this.passwordRef = {}

    this.render()
  },

  submit (evt) {
    evt.preventDefault()

    const email = this.emailRef.current.value
    const password = this.passwordRef.current.value

    this.dispatchEvent(new CustomEvent('signin', {
      detail: {
        email,
        password
      }
    }))
  },

  _getErrorMessage (error = {}) {
    const errorMessages = Object.keys(error).reduce((errors, key) => {
      errors.push([key, error[key]].join(' '))
      return errors
    }, [])

    return errorMessages && errorMessages.length ? html`
      <ul class="error-messages">
        ${
          errorMessages.map(msg => {
            return html`<li>${msg}</li>`
          })
        }
      </ul>
    ` : ''
  },

  render () {
    return this.html`
      <div class="auth-page">
        <div class="container page">
          <div class="row">
            <div class="col-md-6 offset-md-3 col-xs-12">
              <h1 class="text-xs-center">${this.title}</h1>
              <p class="text-xs-center">
                <a href="">Have an account?</a>
              </p>

              ${this._getErrorMessage(this.errors)} 
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
