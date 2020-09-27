import { define } from 'uce'

const componentName = 'rw-paginator'

define(componentName, {
  props: {
    total: 0,
    perPage: 10
  },
  render () {
    return this.html`Yay!`
  }
})
