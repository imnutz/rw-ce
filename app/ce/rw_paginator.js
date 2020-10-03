import { define, html } from 'uce'

const componentName = 'rw-paginator'

define(componentName, {
  bound: ['render', '_getNumberOfPages', '_getPaginator', '_pageSelectionChange'],
  props: {
    total: 1,
    currentPage: 1,
    pageLimit: 0
  },

  _getNumberOfPages () {
    if (this.pageLimit <= 0) return

    return Math.ceil(this.total / this.pageLimit)
  },

  _pageSelectionChange (evt) {
    evt.preventDefault()

    const pageNumber = Number(evt.target.text)

    this.dispatchEvent(new CustomEvent('paginate', {
      bubbles: true,
      detail: { pageNumber }
    }))
  },

  _getPaginator (pages) {
    if (!pages) return html``

    const ranges = Array.from({ length: pages }, (v, i) => i)
    return html`
      <ul class="pagination">
        ${ranges.map(i => {
          const clazz = ['page-item']
          if (i + 1 === this.currentPage) {
            clazz.push('active')
          }
          return html`
              <li class="${clazz.join(' ')}">
                <a class="page-link" onclick=${this._pageSelectionChange}>${i + 1}</a>
              </li>
            `
          })}
      </ul>
    `
  },

  render () {
    return this.html`
      <nav>
        ${this._getPaginator(this._getNumberOfPages())} 
      </nav>
    `
  }
})
