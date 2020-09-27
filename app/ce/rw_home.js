import { define, html } from 'uce'

const componentName = 'rw-home'

define(componentName, {
  bound: ['render', '_feedToggleHandler'],
  props: {
    tabs: [],
    articles: [],
    currentTab: ''
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

  render () {
    return this.html`
      <div class="home-page">

        <div class="banner">
          <div class="container">
            <h1 class="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div class="container page">
          <div class="row">

            <div class="col-md-9">
              <div class="feed-toggle" onclick=${this._feedToggleHandler}>
                ${this._getTabs(this.tabs)}
              </div>

              ${this._getArticles(this.articles)}
            </div>

            <div class="col-md-3">
              <div class="sidebar">
                <rw-tags .tags=${['a', 'b', 'c', 'd']} .title=${'Tags Tags Tags'}/>
              </div>
            </div>

          </div>
        </div>
      </div>
    `
  }
})
