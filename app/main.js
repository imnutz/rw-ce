import { define } from 'uce'

import './ce'

const componentName = 'realworld-app'

define(componentName, {
  render () {
    return this.html`
      <rw-header />
      <rw-home />
      <rw-footer />
    `
  }
})
