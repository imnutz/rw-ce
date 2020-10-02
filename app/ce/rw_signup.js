import { define, html } from 'uce'

const componentName = 'rw-signup'

define(componentName, {
  bound: ['render', 'submit'],
  props: {
    errors: undefined
  },
  init () {
    this.nameRef = {}
    this.emailRef = {}
    this.passwordRef = {}

    this.render()
  },

  submit (evt) {
    evt.preventDefault()

    const username = this.nameRef.current.value
    const email = this.emailRef.current.value
    const password = this.passwordRef.current.value

    this.dispatchEvent(new CustomEvent('signup', {
      bubbles: true,
      detail: {
        username,
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
              <h1 class="text-xs-center">Sign up</h1>
              <p class="text-xs-center">
                <a href="#/signin">Have an account?</a>
              </p>

              ${this._getErrorMessage(this.errors)}

              <form>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="text" placeholder="Your Name" ref=${this.nameRef} />
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="text" placeholder="Email" ref=${this.emailRef}/>
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="password" placeholder="Password" ref=${this.passwordRef}/>
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right" onclick=${this.submit}>
                  Sign up
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    `
  }
})
