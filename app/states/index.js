import sam from 'sam-pattern'

import initialState from './initial_state'

import base from './base'
import user from './user'
import home from './home'
import articleDetail from './article_detail'

const { api, createInstance } = sam

const samInstance = api(createInstance())

// initiate state
samInstance.addInitialState(initialState)

// setup components
const [
  redirected,
  setPage
] = samInstance.addComponent(base).intents

const [
  toggleFeed,
  selectTag,
  selectPage,
  fetchArticles,
  fetchFeeds,
  fetchTags,
  favoriteArticle,
  setFavorite
] = samInstance.addComponent(home).intents

const [
  fetchArticleAndComments,
  setDeletedComment,
  removeComment,
  postComment,
  setNewComment,
  setNewArticleInfo,
  publishArticle
] = samInstance.addComponent(articleDetail).intents

const [
  signin,
  signup,
  setFollow,
  followUser
] = samInstance.addComponent(user).intents

const intents = {
  redirected,
  setPage,
  toggleFeed,
  selectTag,
  fetchArticles,
  fetchFeeds,
  fetchTags,
  signin,
  signup,
  selectPage,
  favoriteArticle,
  setFavorite,
  fetchArticleAndComments,
  setFollow,
  followUser,
  setDeletedComment,
  removeComment,
  postComment,
  setNewComment,
  setNewArticleInfo,
  publishArticle
}

export default {
  stateManager: samInstance,
  intents
}
