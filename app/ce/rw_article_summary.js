import { define } from 'uce'
import dayjs from 'dayjs'

const componentName = 'rw-article-summary'

define(componentName, {
  bound: ['render', '_favorite'],
  props: {
    article: null
  },

  _favorite (evt) {
    evt.preventDefault()

    this.dispatchEvent(new CustomEvent('favorite', {
      bubbles: true,
      detail: {
        slug: this.article.slug
      }
    }))
  },

  render () {
    if (!this.article) return this.html``

    const timestamp = dayjs(this.article.createdAt, 'YYYY-MM-DD')

    return this.html`
      <div class="article-preview">
        <div class="article-meta">
          <a href="profile.html"><img src="${this.article.author.image}" /></a>
          <div class="info">
            <a href=${'#/@' + this.article.author.username} class="author">${this.article.author.username}</a>
            <span class="date">${timestamp.format('MMMM DD, YYYY')}</span>
          </div>
          <button class="btn btn-outline-primary btn-sm pull-xs-right" onclick=${this._favorite}>
            <i class="ion-heart"></i> ${this.article.favoritesCount}
          </button>
        </div>
        <a href=${`#/article/${this.article.slug}`} class="preview-link">
          <h1>${this.article.title}</h1>
          <p>${this.article.description}</p>
          <span>Read more...</span>
        </a>
      </div>
    `
  }
})
