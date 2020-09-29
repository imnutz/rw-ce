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

    this.intents.signin(email, password)
  },

  ontogglefeed (evt) {
    this.intents.toggleFeed(evt.detail.tabId)
  },

  ontagselection (evt) {
    this.intents.selectTag(evt.detail.tag)
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
    const articles = homeState ? homeState.articles : undefined
    const tags = homeState ? homeState.tags : []
    const currentTab = homeState ? homeState.currentTab : ''

    return html`
      <rw-home 
        .navItems=${this.state.header} 
        .tabs=${tabs}
        .articles=${articles}
        .tags=${tags}
        .currentTab=${currentTab}
        .isFetching=${this.state.fetchingArticles}
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
