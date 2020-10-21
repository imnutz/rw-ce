import { define, html } from 'uce'

const componentName = 'rw-profile'

define(componentName, {
  bound: ['render', '_getEditSettingsButton', '_getFollowButton', '_isAuthor', '_getArticles'],

  props: {
    tabs: undefined,
    articles: undefined,
    profile: undefined,
    currentUser: undefined,
    articlesCount: 0,
    currentTab: undefined,
    currentPage: 1
  },

  _isAuthor () {
    return this.currentUser && this.currentUser.username === this.profile.username
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
                <a class="${clazz.join(' ')}" href=${['#/@', this.profile.username, t.path].join('')} data-tid="${t.id}">${t.name}</a>
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

  _getEditSettingsButton () {
    return html`
      <a class="btn btn-sm btn-outline-secondary action-btn" href="#/settings">
        <i class="ion-plus-round"></i>
        &nbsp;
        Edit settings
      </a>
    `
  },

  _getFollowButton () {
    const following = this.profile.following

    if (following) {
      return html`
        <button class="btn btn-sm btn-outline-secondary">
          <i class="ion-plus-round"></i>
          &nbsp;
          Unfollow ${this.profile.username}</span>
        </button>
      `
    }

    return html`
      <button class="btn btn-sm btn-outline-secondary">
        <i class="ion-plus-round"></i>
        &nbsp;
        Follow ${this.profile.username}</span>
      </button>
    `
  },

  render () {
    if (!this.profile) return this.html`loading...`
    return this.html`
      <div class="profile-page">

        <div class="user-info">
          <div class="container">
            <div class="row">

              <div class="col-xs-12 col-md-10 offset-md-1">
                <img src=${this.profile.image} class="user-img" />
                <h4>${this.profile.username}</h4>
                <p>${this.profile.bio}</p>
                ${ this._isAuthor() ? this._getEditSettingsButton() : this._getFollowButton() }
              </div>

            </div>
          </div>
        </div>

        <div class="container">
          <div class="row">

            <div class="col-xs-12 col-md-10 offset-md-1">
              <div clss="articles-toggle">
                ${this._getTabs(this.tabs)}
              </div>

              ${this._getArticles(this.articles)}
            </div>

            <div class="col-xs-12 col-md-10 offset-md-1">
              <rw-paginator .pageLimit=${10} .total=${this.articlesCount} .currentPage=${this.currentPage}/>
            </div>
          </div>

        </div>

      </div>
    `
  }
})
