import { define } from 'uce'

const componentName = 'rw-settings'

define(componentName, {
  bound: ['render', '_submit', '_logout'],

  props: {
    user: undefined
  },

  init () {
    this.imgRef = {}
    this.usernameRef = {}
    this.bioRef = {}
    this.emailRef = {}
    this.pwdRef = {}

    this.render()
  },

  _submit (evt) {
    evt.preventDefault()

    const imageUrl = this.imgRef.current.value
    const username = this.usernameRef.current.value
    const bio = this.bioRef.current.value
    const email = this.emailRef.current.value
    const password = this.pwdRef.current.value

    this.dispatchEvent(new CustomEvent('savesettings', {
      bubbles: true,
      detail: {
        imageUrl,
        username,
        bio,
        email,
        password
      }
    }))
  },

  _logout (evt) {
    evt.preventDefault()

    this.dispatchEvent(new CustomEvent('logout', { bubbles: true }))
  },

  render () {
    const {
      image = '',
      username = '',
      bio = '',
      email = ''
    } = this.user || {}

    return this.html`
      <div class="settings-page">
        <div class="container page">
          <div class="row">

            <div class="col-md-6 offset-md-3 col-xs-12">
              <h1 class="text-xs-center">Your Settings</h1>

              <form>
                <fieldset>
                    <fieldset class="form-group">
                      <input class="form-control" type="text" placeholder="URL of profile picture" value=${image} ref=${this.imgRef}/>
                    </fieldset>

                    <fieldset class="form-group">
                      <input class="form-control form-control-lg" type="text" placeholder="Your Name" value=${username} ref=${this.usernameRef}/>
                    </fieldset>

                    <fieldset class="form-group">
                      <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you" ref=${this.bioRef}>${bio}</textarea>
                    </fieldset>

                    <fieldset class="form-group">
                      <input class="form-control form-control-lg" type="text" placeholder="Email" value=${email} ref=${this.emailRef} />
                    </fieldset>

                    <fieldset class="form-group">
                      <input class="form-control form-control-lg" type="password" placeholder="New password" ref=${this.pwdRef} />
                    </fieldset>

                    <button class="btn btn-lg btn-primary pull-xs-right" onclick=${this._submit}>Update Settings</button>
                </fieldset>
              </form>

              <hr/>
              <button class="btn btn-outline-danger" onclick=${this._logout}>Or click here to logout</button>
            </div>
          </div>
        </div>
      </div>
    `
  }
})
