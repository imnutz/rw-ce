import { define, html } from 'uce'

const componentName = 'rw-paginator'

define(componentName, {
  bound: ['render', '_getNumberOfPages', '_getPaginator'],
  props: {
    total: 1,
    currentPage: 1,
    perPage: 10
  },

  _getNumberOfPages () {
    return Math.ceil(this.total / this.perPage)
  },

  _getPaginator (pages) {
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
                <a class="page-link">${i + 1}</a>
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
