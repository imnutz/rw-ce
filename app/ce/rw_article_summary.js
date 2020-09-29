import { define } from 'uce'

const componentName = 'rw-article-summary'

define(componentName, {
  bound: ['render'],
  props: {
    article: null
  },
  render () {
    if (!this.article) return this.html``

    return this.html`
      <div class="article-preview">
        <div class="article-meta">
          <a href="profile.html"><img src="${this.article.author.image}" /></a>
          <div class="info">
            <a href="" class="author">${this.article.author.username}</a>
            <span class="date">${this.article.createdAt}</span>
          </div>
          <button class="btn btn-outline-primary btn-sm pull-xs-right">
            <i class="ion-heart"></i> ${this.article.favoritesCount}
          </button>
        </div>
        <a href="" class="preview-link">
          <h1>${this.article.title}</h1>
          <p>${this.article.description}</p>
          <span>Read more...</span>
        </a>
      </div>
    `
  }
})