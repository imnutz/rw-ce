import { define, html } from 'uce'

import './ce'

const componentName = 'realworld-app'

define(componentName, {
  bound: ['render', 'signinHandler'],

  props: {
    state: {}
  },

  init () {
    this.render()
  },

  signinHandler (evt) {
    const { detail: { email, password } } = evt

    this.intents.iSignin(email, password)
  },

  _getPage () {
    const page = this.state.page
    if (page === 'signin') {
      return html`
        <rw-signin onsignin=${this.signinHandler} .errors=${this.state.authErrors}/>
      `
    }

    return html`
      <rw-home .navItems=${this.state.header}/>
    `
  },
  render () {
    const {
      appName,
      header
    } = this.state

    return this.html`
      <rw-header .appName=${appName} .navItems=${header}/>
      ${this._getPage()}
      <rw-footer />
    `
  }
})
