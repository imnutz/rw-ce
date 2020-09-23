import { define, html } from 'uce'
import createHandler from 'reactive-props'

import './ce'

const componentName = 'realworld-app'

const reactive = createHandler({ dom: true })

define(componentName, {
  bound: ['render', 'signinHandler'],

  init () {
    this.state = reactive(this, { data: this.data }, this.render)

    this.render()
  },

  signinHandler (evt) {
    const { detail: { email, password } } = evt

    this.intents.iSignin(email, password)
  },

  _getPage () {
    const page = this.state.data.page
    if (page === 'signin') {
      return html`
        <rw-signin onsignin=${this.signinHandler} .errors=${this.state.data.authErrors}/>
      `
    }

    return html`
      <rw-home />
    `
  },
  render () {
    const {
      data: {
        appName,
        header
      }
    } = this.state
    return this.html`
      <rw-header .appName=${appName} .navItems=${header}/>
      ${this._getPage()}
      <rw-footer />
    `
  }
})
