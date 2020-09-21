import { define, html } from 'uce'
import createHandler from 'reactive-props'

import './ce'

const componentName = 'realworld-app'

const reactive = createHandler({ dom: true })

define(componentName, {
  bound: ['render'],

  init () {
    this.state = reactive(this, {
      data: this.data
    }, this.render)

    this.render()
  },

  _getPage () {
    const page = this.state.data.page
    if (page === 'signin') {
      return html`
        <rw-signin />
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
