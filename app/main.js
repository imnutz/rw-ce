import { define, html } from 'uce'
import { pages, PAGE_LIMIT } from './constants'

import './ce'

const componentName = 'realworld-app'

define(componentName, {
  bound: ['render', '_getPage'],

  props: {
    state: {}
  },

  init () {
    this.render()
  },

  onsignin (evt) {
    const { detail: { email, password } } = evt

    this.intents.signin(email, password)
  },

  onsignup (evt) {
    const { detail: { username, email, password } } = evt
    this.intents.signup(username, email, password)
  },

  ontogglefeed (evt) {
    this.intents.toggleFeed(evt.detail.tabId)
  },

  ontagselection (evt) {
    this.intents.selectTag(evt.detail.tag)
  },

  onpaginate (evt) {
    const page = evt.detail.pageNumber
    this.intents.selectPage(page)
  },

  onfavorite (evt) {
    const slug = evt.detail.slug
    this.intents.setFavorite(slug)
  },

  onfollow (evt) {
    const { following, username } = evt.detail
    this.intents.setFollow(username, following)
  },

  ondeletecomment (evt) {
    const {
      commentId
    } = evt.detail

    this.intents.setDeletedComment(commentId)
  },

  onpostcomment (evt) {
    const comment = evt.detail.comment
    this.intents.setNewComment(comment)
  },

  onsavearticle (evt) {
    const {
      isEditing,
      slug,
      title,
      description,
      body,
      tags: tagList
    } = evt.detail

    if (isEditing) {
      this.intents.setEditedArticle({
        slug,
        title,
        description,
        body,
        tagList
      })
    } else {
      this.intents.setNewArticleInfo(title, description, body, tagList)
    }
  },

  ondeletearticle (evt) {
    const slug = evt.detail.slug

    this.intents.setDeletedArticle(slug)
  },

  onlogout () {
    this.intents.logout()
  },

  onsavesettings (evt) {
    const {
      imageUrl: image,
      username,
      bio,
      email,
      password
    } = evt.detail

    var newSettings = { image, username, email, bio }

    if (password) {
      newSettings.password = password
    }

    this.intents.setUserSettings(newSettings)
  },

  _getPage () {
    const page = this.state.page
    if (page === pages.SIGNIN) {
      return html`
        <rw-signin .errors=${this.state.authErrors}/>
      `
    } else if (page === pages.SIGNUP) {
      return html`
        <rw-signup .errors=${this.state.registrationErrors}/>
      `
    } else if (page === pages.ARTICLE) {
      return html`
        <rw-article-detail 
          .article=${this.state.articleDetail} 
          .comments=${this.state.articleComments}
          .isAuthenticated=${this.state.isAuthenticated}
          .currentUser=${this.state.user}
        />
      `
    } else if (page === pages.EDITOR) {
      return html`<rw-editor .errors=${this.state.articleCreationErrors} .article=${this.state.editedArticle}/>`
    } else if (page === pages.SETTINGS) {
      return html`<rw-settings .user=${this.state.settingsUser} .errors=${this.state.updateSettingErrors} />`
    } else if (page === pages.PROFILE) {
      return html`<rw-profile/>`
    }

    const homeState = this.state.home
    const tabs = homeState ? homeState.tabs : []
    const articles = homeState ? homeState.articles : undefined
    const articlesCount = homeState ? homeState.articlesCount : 1
    const currentPage = homeState ? homeState.currentPage : 1
    const tags = homeState ? homeState.tags : []
    const currentTab = homeState ? homeState.currentTab : ''

    return html`
      <rw-home 
        .navItems=${this.state.header} 
        .tabs=${tabs}
        .articles=${articles}
        .articlesCount=${articlesCount}
        .currentPage=${currentPage}
        .tags=${tags}
        .currentTab=${currentTab}
        .isFetching=${this.state.fetchingArticles}
        .isPaginating=${this.state.paginating}
        .pageLimit=${PAGE_LIMIT}
        .isAuthenticated=${this.state.isAuthenticated}
      />
    `
  },

  render () {
    const {
      appName,
      header
    } = this.state

    return this.html`
      <rw-header .appName=${appName} .navItems=${header}/>
      ${this._getPage()}
      <rw-footer />
    `
  }
})
