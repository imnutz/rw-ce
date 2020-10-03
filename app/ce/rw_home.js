import { define, html } from 'uce'

const componentName = 'rw-home'

define(componentName, {
  bound: ['render', '_feedToggleHandler'],
  props: {
    tabs: [],
    articles: [],
    articlesCount: 1,
    currentPage: 1,
    tags: [],
    currentTab: null,
    isFetching: false,
    isPaginating: false,
    pageLimit: 0,
    isAuthenticated: false
  },

  _feedToggleHandler (evt) {
    evt.preventDefault()

    const target = evt.target

    this.dispatchEvent(new CustomEvent('togglefeed', {
      bubbles: true,
      detail: { tabId: target.getAttribute('data-tid') }
    }))
  },

  _getTabs (tabs = []) {
    return html`
      <ul class="nav nav-pills outline-active">
        ${
          tabs.map(t => {
            const clazz = ['nav-link']
            if (t.id === this.currentTab) {
              clazz.push('active')
            }
            return html`
              <li class="nav-item">
                <a class="${clazz.join(' ')}" href="#" data-tid="${t.id}">${t.name}</a>
              </li>
            `
          })
        }
      </ul>
    `
  },

  _getArticles (articles = []) {
    return articles.map(article => {
      return html`
        <rw-article-summary .article=${article} />
      `
    })
  },

  _getLoading () {
    return html`
      <div class="loading article-preview">
        Loading articles...
      </div>
    `
  },

  _getBanner () {
    return html`
      <div class="banner">
        <div class="container">
          <h1 class="logo-font">conduit</h1>
          <p>A place to share your knowledge.</p>
        </div>
      </div>
    `
  },

  render () {
    return this.html`
      <div class="home-page">
        ${!this.isAuthenticated ? this._getBanner() : html``}
        <div class="container page">
          <div class="row">
            <div class="col-md-9">
              <div class="feed-toggle" onclick=${this._feedToggleHandler}>
                ${this._getTabs(this.tabs)}
              </div>

              ${this.isFetching ? this._getLoading() : this._getArticles(this.articles)}
              ${this.isPaginating ? this._getLoading() : html``}
            </div>

            <div class="col-md-3">
              <div class="sidebar">
                <rw-tags .tags=${this.tags} .title=${'Tags Tags Tags'}/>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-9">
              ${!this.isFetching ? html`<rw-paginator .pageLimit=${this.pageLimit} .total=${this.articlesCount} .currentPage=${this.currentPage}/>` : html``}
            </div>
          </div>
        </div>
      </div>
    `
  }
})
