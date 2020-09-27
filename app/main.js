import { define, html } from 'uce'

import './ce'

const componentName = 'realworld-app'

define(componentName, {
  bound: ['render', 'signinHandler', '_getPage'],

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

  ontogglefeed (evt) {
    console.log(evt.detail)
    this.intents.iToggleFeed(evt.detail.tabId)
  },

  _getPage () {
    const page = this.state.page
    if (page === 'signin') {
      return html`
        <rw-signin onsignin=${this.signinHandler} .errors=${this.state.authErrors}/>
      `
    }

    const homeState = this.state.home
    const tabs = homeState ? homeState.tabs : []
    const articles = homeState ? homeState.articles : []
    const currentTab = homeState ? homeState.currentTab : ''

    return html`
      <rw-home 
        .navItems=${this.state.header} 
        .tabs=${tabs}
        .articles=${articles}
        .currentTab=${currentTab}
      />
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
