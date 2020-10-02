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
  start,
  redirected,
  setPage
] = samInstance.addComponent(base).intents

const [
  toggleFeed,
  selectTag,
  fetchArticles,
  fetchFeeds,
  fetchTags
] = samInstance.addComponent(home).intents

const [
  signin,
  signup
] = samInstance.addComponent(user).intents

const intents = {
  start,
  redirected,
  setPage,
  toggleFeed,
  selectTag,
  fetchArticles,
  fetchFeeds,
  fetchTags,
  signin,
  signup
}

export default {
  stateManager: samInstance,
  intents
}
