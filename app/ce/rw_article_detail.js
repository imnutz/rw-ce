import { define, html } from 'uce'
import dayjs from 'dayjs'

const componentName = 'rw-article-detail'

define(componentName, {
  bound: [
    'render',
    '_getFollowButton',
    '_getFavoriteButton',
    '_getCommentsForm',
    '_favoriteHandler',
    '_deleteComment',
    '_deleteArticle',
    '_postCommentHandler'
  ],
  props: {
    article: undefined,
    comments: undefined,
    isAuthenticated: false,
    currentUser: undefined
  },

  init () {
    this.inputRef = {}

    this.render()
  },

  _postCommentHandler (evt) {
    evt.preventDefault()

    const value = this.inputRef.current.value

    if (value) {
      this.dispatchEvent(new CustomEvent('postcomment', {
        bubbles: true,
        detail: {
          comment: value
        }
      }))
    }
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

  _deleteComment (evt) {
    evt.preventDefault()

    const commentId = Number(evt.target.getAttribute('data-cid'))

    this.dispatchEvent(new CustomEvent('deletecomment', {
      bubbles: true,
      detail: { commentId }
    }))
  },

  _deleteArticle (evt) {
    evt.preventDefault()

    if (this.article) {
      this.dispatchEvent(new CustomEvent('deletearticle', {
        bubbles: true,
        detail: {
          slug: this.article.slug
        }
      }))
    }
  },

  _getFollowButton () {
    const following = this.article.author.following

    return html`
      <rw-follow-toggler .username=${this.article.author.username} .following=${following} />
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

  _getAuthorButton () {
    return html`
      <a class="btn btn-sm btn-outline-secondary" href="${'#/editor/' + this.article.slug}">
        <i class="ion-edit"></i>
        &nbsp;
        Edit Article
      </a>

      <button class="btn btn-sm btn-outline-danger" onclick=${this._deleteArticle}>
        <i class="ion-trash-a"></i>
        &nbsp;
        Delete Article
      </button>
    `
  },

  _isAuthor () {
    return this.currentUser && this.currentUser.username === this.article.author.username
  },

  _getComments () {
    if (this.comments && this.comments.length) {
      return html`
        ${
          this.comments.map(comment => {
            const timestamp = dayjs(comment.createdAt, 'YYYY-MM-DD')
            const showTrashBtn = this.currentUser && this.currentUser.username === comment.author.username

            return html`
              <div class="card" onclick=${this._deleteComment}>
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
                  ${showTrashBtn ? html`
                      <span class="mod-options">
                        <i class="ion-trash-a" data-cid=${comment.id}></i>
                      </span>
                    ` : html``
                  }
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
    const imgSrc = this.currentUser ? this.currentUser.image : ''
    return html`
      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <form class="card comment-form">
            <div class="card-block">
              <textarea class="form-control article-comment-input" placeholder="Write a comment..." rows="3" ref=${this.inputRef}></textarea>
            </div>
            <div class="card-footer">
              <img src=${imgSrc} class="comment-author-img" />
              <button class="btn btn-sm btn-primary" onclick=${this._postCommentHandler}>
               Post Comment
              </button>
            </div>
          </form>

          ${this._getComments()}
        </div>
      </div>
    `
  },

  _getButtons () {
    if (this._isAuthor()) {
      return this._getAuthorButton()
    }

    return html`
      ${this._getFollowButton()}
      &nbsp;&nbsp;
      ${this._getFavoriteButton()}
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
              ${this._getButtons()}
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

              ${this._getButtons()}
            </div>
          </div>

          ${this._getCommentsForm()}
        </div>
      </div> 
    `
  }
})
