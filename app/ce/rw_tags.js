import { define, html } from 'uce'

const componentName = 'rw-tags'

define(componentName, {
  bound: ['render', '_getTags', '_tagSelectionHandler'],
  props: {
    tags: undefined,
    title: ''
  },

  _tagSelectionHandler (evt) {
    evt.preventDefault()
    const target = evt.target

    this.dispatchEvent(new CustomEvent('tagselection', { bubbles: true, detail: { tag: target.text } }))
  },

  _getTags () {
    return html`
      <div class="tag-list" onclick=${this._tagSelectionHandler}>
        ${
          this.tags && this.tags.map(t => {
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
