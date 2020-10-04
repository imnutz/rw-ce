import { define, html } from 'uce'
import dayjs from 'dayjs'

const componentName = 'rw-article-detail'

define(componentName, {
  bound: [
    'render',
    '_getFollowButton',
    '_getFavoriteButton',
    '_getCommentsForm',
    '_followHandler',
    '_favoriteHandler'
  ],
  props: {
    article: undefined,
    comments: undefined,
    isAuthenticated: false
  },

  _followHandler (evt) {
    evt.preventDefault()

    const {
      following,
      username
    } = this.article.author

    this.dispatchEvent(new CustomEvent('follow', {
      bubbles: true,
      detail: { following, username }
    }))
  },

  _favoriteHandler (evt) {
    evt.preventDefault()

    this.dispatchEvent(new CustomEvent('favorite', {
      bubbles: true,
      detail: {
        slug: this.article.slug
      }
    }))
  },

  _getFollowButton () {
    const following = this.article.author.following

    if (following) {
      return html`
        <button class="btn btn-sm btn-outline-secondary" onclick=${this._followHandler}>
          <i class="ion-plus-round"></i>
          &nbsp;
          Unfollow ${this.article.author.username}</span>
        </button>
      `
    }

    return html`
      <button class="btn btn-sm btn-outline-secondary" onclick=${this._followHandler}>
        <i class="ion-plus-round"></i>
        &nbsp;
        Follow ${this.article.author.username}</span>
      </button>
    `
  },

  _getFavoriteButton () {
    const favorited = this.article.favorited

    if (favorited) {
      return html`
        <button class="btn btn-sm btn-outline-primary" onclick=${this._favoriteHandler}>
          <i class="ion-heart"></i>
          &nbsp;
          Unfavorite Post <span class="counter">(${this.article.favoritesCount})</span>
        </button>
      `
    }

    return html`
      <button class="btn btn-sm btn-outline-primary" onclick=${this._favoriteHandler}>
        <i class="ion-heart"></i>
        &nbsp;
        Favorite Post <span class="counter">(${this.article.favoritesCount})</span>
      </button>
    `
  },

  _getComments () {
    if (this.comments && this.comments.length) {
      return html`
        ${
          this.comments.map(comment => {
            const timestamp = dayjs(comment.createdAt, 'YYYY-MM-DD')
            return html`
              <div class="card">
                <div class="card-block">
                  <p class="card-text">${comment.body}</p>
                </div>
                <div class="card-footer">
                  <a href="" class="comment-author">
                    <img src=${comment.author.image} class="comment-author-img" />
                  </a>
                  &nbsp;
                  <a href="" class="comment-author">${comment.author.username}</a>
                  <span class="date-posted">${timestamp.format('MMMM DD, YYYY')}</span>
                </div>
              </div>
            `
          })
        }
      `
    }

    return html``
  },

  _getCommentsForm () {
    if (!this.isAuthenticated) {
      return html`
        <div class="row">
          <div class="col-xs-12 col-md-8 offset-md-2">
            <a href="#/signin">Sign in</a> or <a href="#/signup">sign up </a> to add comments on this article.
          </div>
        </div>
      `
    }
    return html`
      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form">
            <div class="card-block">
              <textarea class="form-control" placeholder="Write a comment..." rows="3"></textarea>
            </div>
            <div class="card-footer">
              <img src="http://i.imgur.com/Qr71crq.jpg" class="comment-author-img" />
              <button class="btn btn-sm btn-primary">
               Post Comment
              </button>
            </div>
          </form>

          ${this._getComments()}
        </div>
      </div>
    `
  },

  render () {
    if (!this.article) return html`loading...`

    const timestamp = dayjs(this.article.createdAt, 'YYYY-MM-DD')

    return this.html`
      <div class="article-page">
        <div class="banner">
          <div class="container">

            <h1>${this.article.title}</h1>

            <div class="article-meta">
              <a href=""><img src=${this.article.author.image} /></a>
              <div class="info">
                <a href="" class="author">${this.article.author.username}</a>
                <span class="date">${timestamp.format('MMMM DD, YYYY')}</span>
              </div>
              ${this._getFollowButton()}
              &nbsp;&nbsp;
              ${this._getFavoriteButton()}
            </div>

          </div>
        </div>

        <div class="container page">
          <div class="row article-content">
            <div class="col-md-12">
              ${this.article.body}
            </div>
          </div>

          <hr />

          <div class="article-actions">
            <div class="article-meta">
              <a href=""><img src=${this.article.author.image} /></a>
              <div class="info">
                <a href="" class="author">${this.article.author.username}</a>
                <span class="date">${timestamp.format('MMMM DD, YYYY')}</span>
              </div>
              ${this._getFollowButton()}
              &nbsp;
              ${this._getFavoriteButton()}
            </div>
          </div>

          ${this._getCommentsForm()}
        </div>
      </div> 
    `
  }
})
