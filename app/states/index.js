import sam from 'sam-pattern'

import initialState from './initial_state'

import base from './base'
import user from './user'
import home from './home'

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
  fetchTags
] = samInstance.addComponent(home).intents

const [
  signin,
  signup
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
  selectPage
}

export default {
  stateManager: samInstance,
  intents
}
