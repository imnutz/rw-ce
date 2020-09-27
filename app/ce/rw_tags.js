import { define, html } from 'uce'

const componentName = 'rw-tags'

define(componentName, {
  bound: ['render', '_getTags'],
  props: {
    tags: [],
    title: 'Popular Tags'
  },

  _getTags () {
    return html`
      <div class="tag-list">
        ${
          this.tags.map(t => {
            return html`
              <a href="" class="tag-pill tag-default">${t}</a>
            `
          })
        }
      </div>
    `
  },

  render () {
    this.html`
      <p>${this.title}</p>
      ${this._getTags()}
    `
  }
})
